import { GameSetId } from '../games/types'

export type LegacyPokemonEntryMinimal = {
  id: string
  dexNum: number | null // TODO fix dexnum for PLA pokemon
  name: string
  type1: string
  type2: string | null
  isForm: boolean
  isFemale?: boolean
  hasFemaleForm?: boolean
  baseSpecies: string | null
  // baseForms: string[]
  shinyReleased: boolean
  shinyBase: string | null
  obtainableIn: GameSetId[]
  // versionExclusiveIn: GameId[]
  eventOnlyIn: GameSetId[]
  storableIn: GameSetId[]
}
export type LegacyPokemonEntryMinimalMap = {
  [key: string]: LegacyPokemonEntryMinimal
}
