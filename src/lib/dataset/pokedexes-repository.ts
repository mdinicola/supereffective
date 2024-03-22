import type { Pokedex } from '@supeffective/dataset'
import { assertServerOnly } from '../env'
import { fetchJson } from '../fetch'
import { getDataCDNResourceUrl } from '../urls'
import { mapBy } from '../utils'
import { getPokemonData } from './pokemon-repository'
import type { TrPokedex, TrPokedexEntry, TrPokemon } from './types'

assertServerOnly()

let pokedexesDataset: TrPokedex[] | null = null

export async function getPokedexesData() {
  const pokemon = await getPokemonData()

  if (!pokedexesDataset) {
    pokedexesDataset = await loadPokedexes(pokemon)
  }
  return pokedexesDataset
}

// const pokedexGameIds = games.filter((g) => g.pokedexes.map((p) => p.id).includes(dex.id)).map((g) => g.id)
async function loadPokedexes(pokemon: TrPokemon[]): Promise<TrPokedex[]> {
  const pokedexesDataUrl = getDataCDNResourceUrl('pokedexes.min.json') // HEAVY ~1MB
  const pokedexesSrc = await fetchJson<Pokedex[]>(pokedexesDataUrl)
  const pokemonSlugMap = mapBy(pokemon, 'slug')

  const pokedexes = pokedexesSrc.map((dex) => {
    const dexEntries = dex.entries.map((p) => {
      const fullPkm = pokemonSlugMap[p.id]
      if (!fullPkm) {
        throw new Error(`Pokemon ${p.id} not found in the pokemonIdMap object`)
      }

      if (typeof p.dexNum !== 'number') {
        throw new Error(`No dexNum found for pokemon ${fullPkm.slug} and dex ${dex.id}`)
      }

      return {
        id: fullPkm.slug,
        num: p.dexNum ?? 0,
        isBase: p.isForm,
      } satisfies TrPokedexEntry
    })

    const maxDexNum = dexEntries.reduce((max, p) => Math.max(max, p.num), 0)
    const speciesCount = dex.entries.filter((p) => !p.isForm).length
    const formsCount = dex.entries.filter((p) => p.isForm).length

    return {
      id: dex.id,
      name: dex.name,
      region: dex.region,
      maxDexNum: maxDexNum,
      pokemon: dexEntries,
      speciesCount,
      formsCount,
    } satisfies TrPokedex
  })

  return pokedexes
}
