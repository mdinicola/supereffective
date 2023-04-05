import pokemonEntries from '#/data/builds/pokemon/pokemon-entries-minimal.min.json'
import { PokemonEntryMinimal } from '#/features/legacy/livingdex/pokemon'
import { Pokedex } from '#/features/legacy/pokedex/views/Pokedex'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import PageMeta from '#/layouts/LegacyLayout/PageMeta'
import { abs_url } from '#/primitives/legacy/Link/Links'
import { getPageStaticProps, PageEntry } from '#/services/cms'
import PkSpriteStyles from '#/styles/legacy/PkSpriteStyles'

export async function getStaticProps() {
  const pageProps = getPageStaticProps('pokedex', 60 * 60 * 24) // 24h

  if (!pageProps.props) {
    return pageProps
  }

  return {
    props: {
      entry: pageProps.props.entry,
      pokemon: pokemonEntries,
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
