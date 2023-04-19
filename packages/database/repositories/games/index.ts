import createMemoizedCallback from '@pkg/utils/lib/caching/createMemoizedCallback'

import gameList from '../../data/builds/games.json'
import { GameId, getGameIds } from './ids'
import { LegacyGame, LegacyGameDict } from './types'

export { getGameIds as getSupportedGameIds }

export const getGames = createMemoizedCallback((): LegacyGameDict => {
  return gameList.reduce((acc: any, item) => {
    acc[item.id] = item
    return acc
  }, {})
})

export function getGameById(id: GameId): LegacyGame {
  const absId = _getAbsoluteGameId(id)
  const data = getGames()[absId]
  if (data === undefined) {
    throw new Error(`Game ${absId} not found`)
  }
  return data
}

function _getAbsoluteGameId(gameId: string): GameId {
  switch (gameId) {
    case 'lgp':
      return 'lgpe-lgp'
    case 'lge':
      return 'lgpe-lge'
    case 'sw':
      return 'swsh-sw'
    case 'sh':
      return 'swsh-sh'
    case 'bd':
      return 'bdsp-bd'
    case 'sp':
      return 'bdsp-sp'
    case 's':
      return 'sv-s'
    case 'v':
      return 'sv-v'
  }
  return gameId as GameId
}
