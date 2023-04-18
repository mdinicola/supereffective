import { GetServerSidePropsContext } from 'next'

import { getGameSetByGameId } from '@pkg/database/src/game-sets'
import { GameId } from '@pkg/database/src/games/ids'
import { getLivingDexRepository } from '@pkg/database/src/living-dexes/legacy'
import { getPresets } from '@pkg/database/src/living-dexes/legacy/presets'
import { PresetDexMap } from '@pkg/database/src/living-dexes/legacy/presets/types'
import { LoadedDex } from '@pkg/database/src/living-dexes/legacy/types'
import { deserializeObject, serializeObject } from '@pkg/utils/src/serialization/jsonSerializable'

import LivingDexApp from '#/features/legacy/livingdex/views/LivingDexApp'
import PageMeta from '#/features/pages/components/PageMeta'
import { abs_url } from '#/primitives/legacy/Link/Links'
import PkSpriteStyles from '#/styles/legacy/PkSpriteStyles'

const Page = ({ dexData, presets }: { dexData: any; presets: PresetDexMap }) => {
  const dex = deserializeObject<LoadedDex>(dexData)
  console.log(dex)
  const metaTitle = `${dex.title} | Supereffective.gg Pokédex Tracker`
  const metaDescription = `${dex.title}, a Pokémon Living Dex created with Supereffective's Living Pokédex Tracker app. Caught ${dex.caughtRegular} / ${dex.totalRegular}.`
  const gameSet = getGameSetByGameId(dex.gameId as GameId)
  const gameSetId = gameSet.id

  const containerClasses =
    `page-container full-main-height dex-game ` +
    `dex-gameset-${gameSetId} dex-game-${dex.gameId} dex-preset-${dex.presetId} ` +
    `dex-boxsize-${gameSet.storage?.boxCapacity}`

  return (
    <div style={{ maxWidth: 'none' }} className={containerClasses}>
      <PkSpriteStyles />
      <PageMeta
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        imageUrl={abs_url('/assets/livingdex.png')}
        robots={'noindex, nofollow'}
        canonicalUrl={abs_url('/apps/livingdex/' + dex.id)}
        lang={'en'}
      />
      <LivingDexApp loadedDex={dex} presets={presets} />
    </div>
  )
}

// This value is considered fresh for N seconds eg (s-maxage=10).
// If a request is repeated within the next N seconds, the previously
// cached value will still be fresh. If the request is repeated before 59 seconds,
// the cached value will be stale but still render (stale-while-revalidate=59).
//
// In the background, a revalidation request will be made to populate the cache
// with a fresh value. If you refresh the page, you will see the new value.
// https://nextjs.org/docs/basic-features/data-fetching/overview#getserversideprops-server-side-rendering
export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader('Cache-Control', 'public, s-maxage=20, stale-while-revalidate=59')
  const dexid = context.params?.dexid

  const dexRepo = getLivingDexRepository()

  if (typeof dexid !== 'string' || !dexid.match(/^[a-zA-Z0-9-_]+$/)) {
    return {
      notFound: true,
    }
  }

  try {
    const dex = await dexRepo.getById(dexid)
    return {
      props: {
        dexData: serializeObject(dex),
        presets: getPresets(),
      },
    }
  } catch (e) {
    console.error(e)
    return {
      notFound: true,
    }
  }
}

export default Page