import { getPageRepository } from '@pkg/database/src/pages/getPageRepository'
import { PageEntry } from '@pkg/database/src/pages/types'
import { getPokemonRepository } from '@pkg/database/src/pokemon/getPokemonRepository'
import { PokemonEntryMinimal } from '@pkg/database/src/pokemon/types'

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
      pokemon: getPokemonRepository().getPokemonEntries(),
    },
    revalidate: pageProps.revalidate,
  }
}

const Page = ({
  entry,
  pokemon,
}: {
  entry: PageEntry | null
  pokemon: PokemonEntryMinimal[] | null
}) => {
  if (!entry || pokemon === null) {
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
      <Pokedex pokemon={pokemon} />
    </div>
  )
}

export default Page
