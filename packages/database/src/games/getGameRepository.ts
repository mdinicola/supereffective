import createMemoizedCallback from '@pkg/utils/src/caching/createMemoizedCallback'

import gameList from '../../data/builds/games.json'
import { GAME_IDS, GameBasicInfo, GameDict, GameId } from './types'

export const getGameRepository = createMemoizedCallback(() => {
  // todo: use a map
  const games: GameDict = gameList.reduce((acc: any, item) => {
    acc[item.id] = item
    return acc
  }, {})

  const gameIds = Array.from(GAME_IDS)

  const repo = {
    getAll: (): GameDict => {
      return games
    },
    getAllIds: (): GameId[] => {
      return gameIds
    },
    getById: (id: GameId): GameBasicInfo => {
      const absId = _getAbsoluteGameId(id)
      const data = games[absId]
      if (data === undefined) {
        throw new Error(`Game ${absId} not found`)
      }
      return data
    },
  }

  return repo
})

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
