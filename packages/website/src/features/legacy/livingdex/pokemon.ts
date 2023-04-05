import pokemonGmaxable from '#/data/builds/pokemon/gigantamaxable-pokemon.min.json'
import pokemonEntries from '#/data/builds/pokemon/pokemon-entries-minimal.min.json'
import { GameId, GameSetId } from '#/features/legacy/livingdex/games'

// TODO use API/fetch/useEffect for loading big JSON files . getServerProps might be too much and bad for PageSpeed

export interface PokemonEntryMinimal {
  id: string
  dexNum: number | null // TODO fix dexnum for PLA pokemon
  name: string
  type1: string
  type2: string | null
  isForm: boolean
  baseSpecies: string | null
  baseForms: string[]
  shinyReleased: boolean
  shinyBase: string | null
  obtainableIn: GameSetId[]
  versionExclusiveIn: GameId[]
  eventOnlyIn: GameSetId[]
  storableIn: GameSetId[]
}

export interface PokemonEntryMinimalMap {
  [key: string]: PokemonEntryMinimal
}

const pokemonEntriesMap: { [key: string]: PokemonEntryMinimal } = {}
pokemonEntries.forEach((entry: any) => {
  pokemonEntriesMap[entry.id] = entry
})

export const getPokemonEntry = (pokemonId: string): PokemonEntryMinimal => {
  if (pokemonId in pokemonEntriesMap) {
    return pokemonEntriesMap[pokemonId]
  }

  throw new Error(`No pokemon entry found for ${pokemonId}`)
}

export const canGmax = (pid: string): boolean => {
  return pokemonGmaxable.includes(pid)
}
