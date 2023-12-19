import createMemoizedCallback from '@/lib/utils/caching/createMemoizedCallback'

import { getGameSetByGameId } from '../../../game-sets'
import { fetchData } from '../../../utils'
import { PresetDex, PresetDexMap } from './types'

const presetsJson: PresetDexMap = await fetchData('/legacy-boxpresets.min.json')

export const getPresets = createMemoizedCallback(() => {
  return presetsJson as PresetDexMap
})

export function getPresetsForGame(gameId: string): { [presetId: string]: PresetDex } {
  return getPresets()[getGameSetByGameId(gameId).id] || {}
}

export function getPresetByIdForGame(gameId: string, presetId: string): PresetDex | undefined {
  return getPresetByIdForGameSet(getGameSetByGameId(gameId).id, presetId)
}

export function getPresetByIdForGameSet(
  gameSetId: string,
  presetId: string
): PresetDex | undefined {
  const presets = getPresets()[gameSetId]
  return presets ? presets[presetId] : undefined
}
