import { getPageRepository } from '@pkg/database/repositories/pages/getPageRepository'
import { PageEntry } from '@pkg/database/repositories/pages/types'
import { getPokemonEntries, getPokemonSearchIndex } from '@pkg/database/repositories/pokemon'

import { Pokedex } from '#/features/legacy/pokedex/views/Pokedex'
import PageMeta from '#/features/pages/components/PageMeta'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import { abs_url } from '#/primitives/legacy/Link/Links'
import PkSpriteStyles from '#/styles/legacy/PkSpriteStyles'

export async function getStaticProps() {
  const pageProps = getPageRepository().getStaticProps('pokedex', 60 * 60 * 24) // 24h

  if (!pageProps.props) {
    return pageProps
  }

  return {
    props: {
      entry: pageProps.props.entry,
    },
    revalidate: pageProps.revalidate,
  }
}

const Page = ({ entry }: { entry: PageEntry | null }) => {
  if (!entry) {
    return <LoadingBanner />
  }

  return (
    <div className={'page-container'} style={{ maxWidth: 'none' }}>
      <PkSpriteStyles />
      <PageMeta
        metaTitle={entry.metaTitle}
        metaDescription={entry.metaDescription}
        robots={entry.robots}
        imageUrl={abs_url('/assets/livingdex.png')}
        canonicalUrl={abs_url('/apps/pokedex')}
        lang={'en'}
      />
      <Pokedex pokemon={getPokemonEntries()} pokemonSearch={getPokemonSearchIndex()} />
    </div>
  )
}

export default Page
