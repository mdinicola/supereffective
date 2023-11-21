import createMemoizedCallback from '@pkg/utils/lib/caching/createMemoizedCallback'

import { getGameById } from '../games'
import { fetchData } from '../utils'
import { getGameSetIds } from './ids'
import { LegacyGameSet, LegacyGameSetDict } from './types'

export { getGameSetIds as getSupportedGameSetIds }

const rawEntries: LegacyGameSet[] = await fetchData('/legacy-gamesets.min.json')

export const getGameSets = createMemoizedCallback((): LegacyGameSetDict => {
  return rawEntries.reduce((acc: any, item) => {
    acc[item.id] = item
    return acc
  }, {})
})

export function getGameSetById(id: string): LegacyGameSet {
  const data = getGameSets()[id]
  if (data === undefined) {
    throw new Error(`Game set "${id}" not found`)
  }
  return data
}

export function getGameSetByGameId(id: string): LegacyGameSet {
  return getGameSetById(getGameById(id).setId)
}
