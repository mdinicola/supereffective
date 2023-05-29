import { useContext, useEffect, useRef } from 'react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import { useSession } from '@pkg/auth/lib/hooks/useSession'
import { getGameSetByGameId } from '@pkg/database/repositories/game-sets'
import { GameSetId } from '@pkg/database/repositories/game-sets/ids'
import { GameId } from '@pkg/database/repositories/games/ids'
import { canCreateMoreDexes } from '@pkg/database/repositories/living-dexes/legacy'
import { getPresets } from '@pkg/database/repositories/living-dexes/legacy/presets'
import { createDexFromPreset } from '@pkg/database/repositories/living-dexes/legacy/presets/createDexFromPreset'
import { LoadedDex } from '@pkg/database/repositories/living-dexes/legacy/types'

import { Routes } from '#/config/routes'
import { LivingDexContext } from '#/features/livingdex/state/LivingDexContext'
import { useDexesContext } from '#/features/livingdex/state/LivingDexListContext'
import { GamePresetSelector } from '#/features/livingdex/views/GamePresetSelector'
import LivingDexApp from '#/features/livingdex/views/LivingDexApp'
import PageMeta from '#/features/pages/components/PageMeta'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import { UnauthenticatedBanner } from '#/layouts/LegacyLayout/UnauthenticatedBanner'
import { abs_url } from '#/primitives/legacy/Link/Links'
import PkSpriteStyles from '#/styles/legacy/PkSpriteStyles'
import { devLog } from '#/utils/logger'

interface PageProps {
  selectedGame: GameId | null
  selectedPreset: string | null
}

const Page = ({ selectedGame, selectedPreset }: PageProps) => {
  const auth = useSession()
  const livingdex = useContext(LivingDexContext)
  const { dexes, dexesLoading } = useDexesContext()
  const presetIsSelected = !(!selectedGame || !selectedPreset)
  const router = useRouter()
  const createdDexId = useRef<string | null>(null)
  const presets = getPresets()

  const onSaveHandler = (dex: LoadedDex): void => {
    if (!dex.id) {
      console.warn('Dex id is not set')
      return
    }
    createdDexId.current = dex.id
    router.push(`/apps/livingdex/${dex.id}`)
  }

  const _canCreateMoreDexes = canCreateMoreDexes(dexes)

  useEffect(() => {
    if (livingdex.state && livingdex.state.id) {
      devLog('resetDex called')
      livingdex.actions.resetDex()
    }
  }, [livingdex.state])

  if (auth.isLoading() || dexesLoading) {
    return <LoadingBanner />
  }

  if (!auth.isAuthenticated() || !auth.isOperable()) {
    return <UnauthenticatedBanner />
  }

  if (createdDexId.current !== null) {
    return <LoadingBanner content={'Creating your dex...'} />
  }

  if (!_canCreateMoreDexes && dexes != null) {
    router.push(Routes.LivingDex)

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
  let gameSetId: GameSetId | '' = ''

  if (selectedGame) {
    gameSet = getGameSetByGameId(selectedGame)
    gameSetId = gameSet.id
  }

  if (presetIsSelected) {
    // find preset
    if (gameSetId === '' || presets[gameSetId] === undefined) {
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
      {!presetIsSelected && <GamePresetSelector />}
      {presetIsSelected && foundPreset && (
        <LivingDexApp
          presets={presets}
          loadedDex={createDexFromPreset(
            selectedGame as GameId,
            foundPreset,
            auth.currentUser?.uid
          )}
          onSave={onSaveHandler}
        />
      )}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    return {
      props: {
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
