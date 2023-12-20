import { fetchData } from '@/features/common/data-client'
import { getGameSetByGameId } from '@/features/common/game-sets'
import createMemoizedCallback from '@/lib/utils/caching/createMemoizedCallback'

import { PresetDex, PresetDexMap } from './types'

const rawPresets: PresetDexMap = await fetchRawEntries()

async function fetchRawEntries() {
  const data: PresetDexMap = await fetchData('/legacy-boxpresets.min.json')

  if (typeof data !== 'object') {
    throw new Error('Fetch failed for legacy-boxpresets.min.json: Response was not an object')
  }

  return data
}

export const getPresets = createMemoizedCallback(() => {
  return rawPresets
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
