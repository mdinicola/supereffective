import LayoutArticle from '@/components/layout/main/LayoutArticle'
import { getPokemonData } from '@/lib/dataset/pokemon-repository'
// import Image from 'next/image'

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export const dynamic = 'error'

export default async function Page(_props: PageProps) {
  const pokemonDataset = await getPokemonData()

  return (
    <article>
      <LayoutArticle mainTitle={'Pokémon'}>
        <p>Dex entries:</p>
        <ul
          style={{
            columns: 3,
          }}
        >
          {pokemonDataset.map((pokemon) => (
            <li
              key={pokemon.id}
              style={
                {
                  // contentVisibility: 'auto',
                }
              }
            >
              {/* <a href={`/v4/pokemon/${pokemon.id}/opengraph-image`}>
                <Image
                  src={`/v4/pokemon/${pokemon.id}/opengraph-image`}
                  alt={pokemon.id}
                  width={400}
                  height={160}
                  loading="lazy"
                />
              </a> */}
              <a href={`/v4/pokemon/${pokemon.slug}`}>{pokemon.name}</a>
            </li>
          ))}
        </ul>
      </LayoutArticle>
    </article>
  )
}
