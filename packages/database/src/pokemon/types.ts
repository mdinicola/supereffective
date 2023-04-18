import { SimpleSearchIndex } from '@pkg/utils/src/searching/algos/SimpleSearchIndex'

import { GameSetId } from '../game-sets/ids'
import { RegionId } from '../regions/ids'
import { PokemonTypeId } from '../types/ids'
import { PokemonId } from './ids'

// Generated by https://quicktype.io
export interface RawPokemonEntry {
  id: PokemonId
  nid: string
  dexNum: number
  formId: string | null
  name: string
  formName: string | null
  region: RegionId
  generation: number
  type1: PokemonTypeId
  type2: PokemonTypeId | null
  color: PokemonColor
  abilities: {
    primary: string
    secondary: null | string
    hidden: null | string
  }
  isLegendary: boolean
  isMythical: boolean
  isUltraBeast: boolean
  ultraBeastCode: null | string
  isDefault: boolean
  isForm: boolean
  isSpecialAbilityForm: boolean
  isCosmeticForm: boolean
  isFemaleForm: boolean
  hasGenderDifferences: boolean
  isBattleOnlyForm: boolean
  isSwitchableForm: boolean
  isFusion: boolean
  fusedWith: Array<string[]> | null
  isMega: boolean
  isPrimal: boolean
  isRegional: boolean
  isGmax: boolean
  canGmax: boolean
  canDynamax: boolean
  canBeAlpha: boolean
  debutIn: GameSetId
  obtainableIn: GameSetId[]
  versionExclusiveIn: string[]
  eventOnlyIn: GameSetId[]
  storableIn: GameSetId[]
  shinyReleased: boolean
  shinyBase: null | PokemonId
  baseStats: PokemonBaseStats
  goStats: PokemonGoBaseStats
  weight: {
    avg: number
    min: number
    max: number
    alpha: number
  }
  height: {
    avg: number
    min: number
    max: number
    alpha: number
  }
  maleRate: number
  femaleRate: number
  refs: {
    pogo: null | string
    veekunDb: null | string
    smogon: string
    showdown: string
    showdownDef: string
    serebii: string
    bulbapedia: string
    homeSprite: string
    miniSprite: string
  }
  baseSpecies: null | PokemonId
  baseForms: PokemonId[]
  forms: PokemonId[] | null
  evolutions: PokemonId[]
}

export interface PokemonBaseStats {
  hp: number
  atk: number
  def: number
  spa: number
  spd: number
  spe: number
}

export interface PokemonGoBaseStats {
  atk: number
  def: number
  sta: number
}

export enum PokemonColor {
  Black = 'black',
  Blue = 'blue',
  Brown = 'brown',
  Gray = 'gray',
  Green = 'green',
  Pink = 'pink',
  Purple = 'purple',
  Red = 'red',
  White = 'white',
  Yellow = 'yellow',
}

export type PokemonEntry = {
  id: PokemonId
  dexNum: number | null
  name: string
  type1: PokemonTypeId
  type2: PokemonTypeId | null
  color: PokemonColor
  shiny: {
    base: PokemonId | null
    released: boolean
  }
  form: {
    isForm: boolean
    baseSpecies: PokemonId | null
    // baseForms: PokemonId[]
    isFemaleForm: boolean
    isMaleForm: boolean
    hasGenderForms: boolean
    hasGmax: boolean
    isGmax: boolean
  }
  location: {
    obtainableIn: GameSetId[]
    // versionExclusiveIn: GameId[]
    eventOnlyIn: GameSetId[]
    storableIn: GameSetId[]
  }
}

export type PokemonEntryMap = Map<string, PokemonEntry>
export type PokemonEntrySearchIndex = SimpleSearchIndex<PokemonEntry[]>
