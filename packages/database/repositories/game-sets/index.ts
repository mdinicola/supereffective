import createMemoizedCallback from '@pkg/utils/lib/caching/createMemoizedCallback'

import gameSetList from '../../data/legacy/gamesets.json'
import { getGameById } from '../games'
import { GameId } from '../games/ids'
import { GameSetId, getGameSetIds } from './ids'
import { LegacyGameSet, LegacyGameSetDict } from './types'

export { getGameSetIds as getSupportedGameSetIds }

export const getGameSets = createMemoizedCallback((): LegacyGameSetDict => {
  return gameSetList.reduce((acc: any, item) => {
    acc[item.id] = item
    return acc
  }, {})
})

export function getGameSetById(id: GameSetId): LegacyGameSet {
  const data = getGameSets()[id]
  if (data === undefined) {
    throw new Error(`Game set "${id}" not found`)
  }
  return data
}

export function getGameSetByGameId(id: GameId): LegacyGameSet {
  return getGameSetById(getGameById(id).setId)
}
