import createMemoizedCallback from '@pkg/utils/src/universal/createMemoizedCallback'

import presetsJson from '../../../data/builds/box-presets-full.min.json'
import { getGameSetRepository } from '../../games/getGameSetRepository'
import { GameId, GameSetId } from '../../games/types'
import { PresetDex, PresetDexMap } from './types'

export const getPresetRepository = createMemoizedCallback(() => {
  const gameSetRepository = getGameSetRepository()
  const presets: PresetDexMap = presetsJson

  const getAll = (): PresetDexMap => {
    return presets
  }

  const getAllPresetsForGame = (gameId: GameId): { [presetId: string]: PresetDex } => {
    return presets[gameSetRepository.getByGameId(gameId).id] || {}
  }

  const getPresetForGame = (gameId: GameId, presetId: string): PresetDex | undefined => {
    return getPresetForGameSet(gameSetRepository.getByGameId(gameId).id, presetId)
  }

  const getPresetForGameSet = (gameSetId: GameSetId, presetId: string): PresetDex | undefined => {
    return presets[gameSetId] ? presets[gameSetId][presetId] : undefined
  }

  return {
    getAll,
    getAllPresetsForGame,
    getPresetForGame,
    getPresetForGameSet,
  }
})
