import { GameSetId } from '../../../game-sets/ids'
import { GameId } from '../../../games/ids'
import { PokemonId } from '../../../pokemon/ids'

export type PresetDexPokemon =
  | {
      pid: PokemonId
      caught?: boolean
      shiny?: boolean
      shinyLocked?: boolean
      gmax?: boolean
      alpha?: boolean
    }
  | string

export type NullablePresetDexPokemon = PresetDexPokemon | null

export type PresetDexBox = {
  title?: string
  pokemon: NullablePresetDexPokemon[]
}

export type PresetDex = {
  id: string
  name: string
  version: number
  game?: GameId | undefined
  gameSet: GameSetId
  description: string
  boxes: PresetDexBox[]
}

export type PresetDexMap = Record<GameSetId, Record<string, PresetDex>>
