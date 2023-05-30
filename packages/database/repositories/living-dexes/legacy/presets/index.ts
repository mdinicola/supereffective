import createMemoizedCallback from '@pkg/utils/lib/caching/createMemoizedCallback'

import presetsJson from '../../../../data/legacy/box-presets.json'
import { getGameSetByGameId } from '../../../game-sets'
import { GameSetId } from '../../../game-sets/ids'
import { GameId } from '../../../games/ids'
import { PresetDex, PresetDexMap } from './types'

export const getPresets = createMemoizedCallback(() => {
  return presetsJson as PresetDexMap
})

export function getPresetsForGame(gameId: GameId): { [presetId: string]: PresetDex } {
  return getPresets()[getGameSetByGameId(gameId).id] || {}
}

export function getPresetByIdForGame(gameId: GameId, presetId: string): PresetDex | undefined {
  return getPresetByIdForGameSet(getGameSetByGameId(gameId).id, presetId)
}

export function getPresetByIdForGameSet(
  gameSetId: GameSetId,
  presetId: string
): PresetDex | undefined {
  const presets = getPresets()[gameSetId]
  return presets ? presets[presetId] : undefined
}
