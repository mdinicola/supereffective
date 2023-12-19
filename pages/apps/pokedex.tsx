import PageMeta from '@/features/pages/components/PageMeta'
import { Pokedex } from '@/features/pokedex/views/Pokedex'
import { LoadingBanner } from '@/lib/components/layouts/LegacyLayout/LoadingBanner'
import { abs_url } from '@/lib/components/legacy/Link/Links'
import { getPageRepository } from '@/lib/repositories/pages/getPageRepository'
import { PageEntry } from '@/lib/repositories/pages/types'
import { getPokemonEntries, getPokemonSearchIndex } from '@/lib/repositories/pokemon'

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
