import { GameId, GameSetId } from '../../games/types'

export type PresetDexPokemon =
  | {
      pid: string
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
  game?: GameId | string | undefined
  gameSet: GameSetId | string
  description: string
  boxes: PresetDexBox[]
}

export type PresetDexMap = {
  [gameId: string]: {
    [presetId: string]: PresetDex
  }
}
