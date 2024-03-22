import type { Game } from '@supeffective/dataset'
import { assertServerOnly } from '../env'
import { fetchJson } from '../fetch'
import { getDataCDNResourceUrl } from '../urls'
import { mapBy } from '../utils'
import { getPokedexesData } from './pokedexes-repository'
import { getPokemonData } from './pokemon-repository'
import type { TrGame, TrPokedex, TrPokedexBasicInfo, TrPokemon } from './types'

assertServerOnly()

let gamesDataset: TrGame[] | null = null

export async function getGamesData() {
  const pokemon = await getPokemonData()
  const dexes = await getPokedexesData()

  if (!gamesDataset) {
    gamesDataset = await loadGames(pokemon, dexes)
  }
  return gamesDataset
}

// const gamesFilteredDataset = gamesDataset
//   .filter((game) => game.type === 'game' || game.type === 'dlc')
//   .filter((game) => game.pokedexes.length > 0)

// const gamesDatasetMap: Map<string, TrGame> = new Map(gamesDataset.map((game) => [game.id, game]))

async function loadGames(pokemon: TrPokemon[], pokedexes: TrPokedex[]): Promise<TrGame[]> {
  const gamesDataUrl = getDataCDNResourceUrl('games.min.json') // ~32KB
  const gamesSrc = await fetchJson<Game[]>(gamesDataUrl)
  const gamesSrcMap = mapBy(gamesSrc, 'id')
  const pokemonSrcMap = mapBy(pokemon, 'slug')
  const pokedexesSrcMap = mapBy(pokedexes, 'id')

  return gamesSrc.map((g) => {
    let parentName: string | undefined = undefined
    let fullName: string = g.fullName ?? g.name

    if (g.gameSet && g.gameSet !== g.id) {
      const gset = gamesSrcMap[g.gameSet]
      parentName = gset.name
    }

    if (g.type === 'dlc' && g.gameSet && g.gameSet !== g.id) {
      const gset = gamesSrcMap[g.gameSet]
      fullName = `${gset.name} - ${g.name} DLC`
    }

    return {
      id: g.id,
      name: g.name,
      fullName,
      parentName,
      type: g.type,
      pokedexes: g.pokedexes.map((dexId) => {
        const dex = pokedexesSrcMap[dexId]
        if (!dex) {
          throw new Error(`Pokedex ${dexId} not found in the pokedexesSrcMap object`)
        }
        const dexPkms: TrPokemon[] = dex.pokemon.map((p) => pokemonSrcMap[p.id])

        return {
          id: dex.id,
          region: dex.region,
          name: dex.name,
          counters: {
            species: dexPkms.filter((p) => !p.flags.isForm).length,
            forms: dexPkms.filter((p) => p.flags.isForm).length,
            cosmeticForms: dexPkms.filter((p) => p.flags.isCosmeticForm).length,
            shinySpecies: dexPkms.filter((p) => !p.flags.isForm && p.flags.canBeShiny).length,
            shinyForms: dexPkms.filter((p) => p.flags.isForm && p.flags.canBeShiny).length,
            shinyCosmeticForms: dexPkms.filter((p) => p.flags.isCosmeticForm && p.flags.canBeShiny).length,
          },
        } satisfies TrPokedexBasicInfo
      }),
    } satisfies TrGame
  })
}
