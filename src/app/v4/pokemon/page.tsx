import LayoutArticle from '@/components/layout/main/LayoutArticle'
import appConfig from '@/config/app'
import { fetchPokemonIndex } from '@supeffective/dataset'
// import Image from 'next/image'

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page(_props: PageProps) {
  const allPokemon = await fetchPokemonIndex(appConfig.assets.dataUrl)

  return (
    <article>
      <LayoutArticle mainTitle={'Pokémon'}>
        <p>Dex entries:</p>
        <ul
          style={{
            columns: 3,
          }}
        >
          {allPokemon.map((pokemon) => (
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
              <a href={`/v4/pokemon/${pokemon.id}`}>{pokemon.name}</a>
            </li>
          ))}
        </ul>
      </LayoutArticle>
    </article>
  )
}
