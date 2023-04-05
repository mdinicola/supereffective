import { GameId, GameSetId } from '#/features/legacy/livingdex/games'

export type CollectionType = 'users' | 'dexes'
export const DEX_SCHEMA_VERSION = 3

export interface User {
  uid: string
  email: string
  //username?: string // 4-15 chars, only 'a-zA-z0-9_', starting with a letter or _. uniqueness is case-insensitive.
  displayName: string // max 50 chars
  pictureUrl: string
}

export interface UserOwnedDocument {
  id: string | null
  userId?: string
  createdAt?: string
  updatedAt?: string | null
}

export interface RawUserOwnedDocument extends UserOwnedDocument {
  [field: string]: any
}

export interface DexPokemon {
  pid: string
  caught: boolean
  shiny: boolean
  shinyLocked: boolean
  shinyBase: string | null
  gmax: boolean
  alpha: boolean
}

export type NullableDexPokemon = DexPokemon | null

export interface DexBox {
  title: string
  shiny: boolean
  pokemon: NullableDexPokemon[]
}

export interface Dex extends UserOwnedDocument {
  title: string
  schemaVersion: typeof DEX_SCHEMA_VERSION // schema version
  gameId: GameId // e.g. "sw"
  gameSetId: GameSetId // e.g. "swsh"
  presetId: string // e.g. 'grouped-region' | 'fully-sorted' | 'grouped-species'
  presetVersion: number
  caughtRegular: number
  totalRegular: number
  caughtShiny: number
  totalShiny: number
  boxes: DexBox[]
  lostPokemon: NullableDexPokemon[]
}

export type DexList = Array<Dex>
//export type DexListMap = {[key: string]: DexList}

// Storables

export interface StorableDexPokemon {
  pid: string
  caught: boolean
  shiny: boolean // TODO: remove this flag when everyone migrates their dex data to schema version 3
  gmax: boolean
  alpha: boolean
}

export type NullableStorableDexPokemon = StorableDexPokemon | null
export type StorableDexBox = {
  pokemon: NullableStorableDexPokemon[]
  shiny: boolean // generate without shinies first, and with shiny later, filtering out the boxes
}

export interface StorableDex extends UserOwnedDocument {
  title: string
  sver: typeof DEX_SCHEMA_VERSION // schema version
  preset: [GameSetId, GameId, string, number] // gameSetId, gameId, presetId, presetVersion
  caught: [number, number] // [caught regular, total regular]
  caughtShiny: [number, number] // [caught regular, total shinies]
  boxes: StorableDexBox[]
}

export type StorableDexList = Array<StorableDex>
export type PokemonList = (NullableDexPokemon | NullableStorableDexPokemon)[]
