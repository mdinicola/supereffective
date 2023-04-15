import { DexPokemon } from '../dexes/types'
import { GameId, GameSetId } from '../games/types'

export type PokemonEntryMinimal = {
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

export type PokemonEntryMinimalMap = {
  [key: string]: PokemonEntryMinimal
}

export type PokemonRepository = {
  getPokemonEntries: () => PokemonEntryMinimal[]
  getPokemonEntriesMap: () => PokemonEntryMinimalMap
  getPokemonEntry: (pokemonId: string) => PokemonEntryMinimal
  isShinyLocked: (pokemonId: string) => boolean
  isCatchable: (pokemon: DexPokemon) => boolean
  canGmax: (pokemonId: string) => boolean
}
