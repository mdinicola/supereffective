import { useContext, useEffect, useRef } from 'react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import { GameId, getGameSet } from '#/features/legacy/livingdex/games'
import {
  canCreateMoreDexes,
  generateDexFromPreset,
  loadPresets,
  PresetDexMap,
} from '#/features/legacy/livingdex/livingdex'
import { LivingDexContext } from '#/features/legacy/livingdex/state/LivingDexContext'
import { GamePresetSelector } from '#/features/legacy/livingdex/views/GamePresetSelector'
import LivingDexApp from '#/features/legacy/livingdex/views/LivingDexApp'
import { useUserDexes } from '#/features/legacy/users/hooks/useUserDexes'
import { UserContext } from '#/features/legacy/users/state/UserContext'
import { useConditionalRedirect } from '#/hooks/legacy/useConditionalRedirect'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import PageMeta from '#/layouts/LegacyLayout/PageMeta'
import { abs_url } from '#/primitives/legacy/Link/Links'
import { Dex } from '#/services/legacy/datastore/Entities'
import PkSpriteStyles from '#/styles/legacy/PkSpriteStyles'

interface PageProps {
  presets: PresetDexMap
  selectedGame: string | null
  selectedPreset: string | null
}

const Page = ({ presets, selectedGame, selectedPreset }: PageProps) => {
  const userCtx = useContext(UserContext)
  const livingdex = useContext(LivingDexContext)
  const [dexes, loadingDexes] = useUserDexes(userCtx)
  const presetIsSelected = !(!selectedGame || !selectedPreset)
  const router = useRouter()
  const createdDexId = useRef<string | null>(null)

  const onSaveHandler = (dex: Dex): void => {
    createdDexId.current = dex.id
    router.push(`/apps/livingdex/${dex.id}`)
  }

  useConditionalRedirect(
    '/login',
    {
      waitIf: userCtx.state.loading,
      redirectIf: !userCtx.state.loading && userCtx.state.user === null,
      abortRedirectIf: !userCtx.state.loading && userCtx.state.user !== null,
    },
    2000
  )

  useConditionalRedirect(
    '/apps/livingdex',
    {
      waitIf: loadingDexes || createdDexId.current !== null,
      redirectIf: dexes !== null && !canCreateMoreDexes(dexes),
      abortRedirectIf: dexes !== null && canCreateMoreDexes(dexes),
    },
    2000
  )

  useEffect(() => {
    if (livingdex.state && livingdex.state.id) {
      livingdex.actions.resetDex()
    }
  }, [livingdex.state])

  if (userCtx.state.loading || loadingDexes) {
    return <LoadingBanner />
  }

  if (userCtx.state.user === null) {
    return <LoadingBanner content={'You must be signed in to use this app.'} />
  }

  if (createdDexId.current !== null) {
    return <LoadingBanner content={'Creating your dex...'} />
  }

  if (!canCreateMoreDexes(dexes)) {
    return (
      <LoadingBanner
        content={
          <>
            You cannot create more dexes at this point.
            <br />
            Try deleting some of your existing dexes.
          </>
        }
      />
    )
  }

  let foundPreset = null

  let gameSet = undefined
  let gameSetId = ''

  if (selectedGame) {
    gameSet = getGameSet(selectedGame as GameId)
    gameSetId = gameSet.id
  }

  if (presetIsSelected) {
    // find preset
    if (presets[gameSetId] === undefined) {
      return <LoadingBanner content={'Game does not exist: ' + selectedGame} />
    }

    foundPreset = presets[gameSetId][selectedPreset]
    if (foundPreset === undefined) {
      return <LoadingBanner content={'Preset does not exist: ' + selectedPreset} />
    }
  }

  const boxSize = gameSet ? gameSet.storage?.boxCapacity : ''

  const containerClasses =
    `page-container dex-game full-main-height ` +
    `dex-gameset-${gameSetId} dex-game-${selectedGame} dex-preset-${selectedPreset} ` +
    `dex-boxsize-${boxSize}`

  return (
    <div style={{ maxWidth: 'none' }} className={containerClasses}>
      <PkSpriteStyles />
      <PageMeta
        metaTitle={'Living Dex - New'}
        metaDescription={''}
        robots={'noindex, nofollow'}
        canonicalUrl={abs_url('/apps/livingdex/new')}
        lang={'en'}
      />
      {!presetIsSelected && <GamePresetSelector presets={presets} />}
      {presetIsSelected && foundPreset && (
        <LivingDexApp
          presets={presets}
          loadedDex={generateDexFromPreset(
            selectedGame as GameId,
            foundPreset,
            userCtx.state.user.uid
          )}
          onSave={onSaveHandler}
        />
      )}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader('Cache-Control', 'public, s-maxage=20, stale-while-revalidate=59')

  const presets = await loadPresets()

  try {
    return {
      props: {
        presets,
        selectedGame: context.query.game || null,
        selectedPreset: context.query.preset || null,
      },
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

export default Page
