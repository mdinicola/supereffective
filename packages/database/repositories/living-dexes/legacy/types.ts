import { BaseUserDocument } from '../../../lib/types'
import { GameSetId } from '../../game-sets/ids'
import { GameId } from '../../games/ids'
import { PokemonId } from '../../pokemon/ids'

export const DEX_SCHEMA_VERSION = 3

export type DexPokemon = {
  pid: PokemonId
  nid: string
  caught: boolean
  gmax: boolean
  alpha: boolean
  shiny: boolean
  // post load props:
  shinyLocked?: boolean
  shinyBase?: string | null
}

export type NullableDexPokemon = DexPokemon | null

export type DexPokemonList = Array<NullableDexPokemon>

export type DexBox = {
  title?: string
  pokemon: DexPokemonList
  shiny: boolean
}

export type StorableDex = {
  title: string
  sver: typeof DEX_SCHEMA_VERSION // schema version
  preset: [GameId, string, number] | [GameSetId, GameId, string, number] // [gameSetId], gameId, presetId, presetVersion
  caught: [number, number] // [caught regular, total regular]
  caughtShiny: [number, number] // [caught regular, total shinies]
  boxes: Array<DexBox>
} & BaseUserDocument

export type LoadedDex = {
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
  lostPokemon: DexPokemonList
} & BaseUserDocument

export type StorableDexList = Array<StorableDex>
export type LoadedDexList = Array<LoadedDex>

export type LivingDexRepository = {
  getById: (id: string) => Promise<LoadedDex | null>
  getManyByUserFromFirebase: (userUid: string) => Promise<LoadedDexList>
  getManyByUser: (userUid: string) => Promise<LoadedDexList>
  import: (dexes: LoadedDex[], userId: string) => Promise<number>
  save: (dex: LoadedDex, userId: string) => Promise<LoadedDex>
  remove: (id: string) => Promise<void>
}
