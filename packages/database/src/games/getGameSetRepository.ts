import createMemoizedCallback from '@pkg/utils/src/universal/createMemoizedCallback'

import gameSetList from '../../data/sources/games/game-sets.json'
import { LoadedDexList } from '../dexes/types'
import { getGameRepository } from './getGameRepository'
import {
  GameId,
  GameSet,
  GAMESET_IDS,
  GameSetDict,
  GameSetId,
  SUPPORTED_GAME_SETS,
  SUPPORTED_GAMES,
} from './types'

export const getGameSetRepository = createMemoizedCallback(() => {
  // todo: use a map
  const gameSets: GameSetDict = gameSetList.reduce((acc: any, item) => {
    acc[item.id] = item
    return acc
  }, {})

  const gameSetIds = Array.from(GAMESET_IDS)

  const getById = (id: GameSetId): GameSet => {
    const data = gameSets[id]
    if (data === undefined) {
      throw new Error(`Game set "${id}" not found`)
    }
    return data
  }

  const repo = {
    getAll: (): GameSetDict => {
      return gameSets
    },
    getAllIds: (): GameSetId[] => {
      return gameSetIds
    },
    getById,
    getByGameId: (id: GameId): GameSet => {
      return getById(getGameRepository().getById(id).setId)
    },

    getUsedGameSets: (userDexes: LoadedDexList): GameSetId[] => {
      const gameSets = new Set<GameSetId>()
      userDexes.forEach(dex => {
        if (dex.gameSetId && !gameSets.has(dex.gameSetId)) {
          gameSets.add(dex.gameSetId)
        }
      })
      return Array.from(gameSets)
    },

    getAvailableGameSets: (userDexes: LoadedDexList): GameSetId[] => {
      const usedGameSets = new Set(repo.getUsedGameSets(userDexes))
      return SUPPORTED_GAME_SETS.filter(gameSetId => !usedGameSets.has(gameSetId))
    },

    getAvailableGames: (dexes: LoadedDexList): GameId[] => {
      const usableGameSets = repo.getAvailableGameSets(dexes)
      return SUPPORTED_GAMES.filter(gameId => {
        const gameSet = repo.getByGameId(gameId)
        return usableGameSets.includes(gameSet?.id)
      })
    },
  }

  return repo
})
