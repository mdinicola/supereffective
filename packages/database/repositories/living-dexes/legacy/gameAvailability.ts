import { getGameSetByGameId, getSupportedGameSetIds } from '../../game-sets'
import { GameSetId } from '../../game-sets/ids'
import { getSupportedGameIds } from '../../games'
import { GameId } from '../../games/ids'
import { LoadedDexList } from './types'

export function getUsedGameSets(userDexes: LoadedDexList): GameSetId[] {
  const gameSets = new Set<GameSetId>()
  userDexes.forEach(dex => {
    if (dex.gameSetId && !gameSets.has(dex.gameSetId)) {
      gameSets.add(dex.gameSetId)
    }
  })
  return Array.from(gameSets)
}

export function getAvailableGameSets(userDexes: LoadedDexList): GameSetId[] {
  const usedGameSets = new Set(getUsedGameSets(userDexes))
  return getSupportedGameSetIds().filter(gameSetId => !usedGameSets.has(gameSetId))
}

export function getAvailableGames(dexes: LoadedDexList): GameId[] {
  const usableGameSets = getAvailableGameSets(dexes)
  return getSupportedGameIds().filter(gameId => {
    const gameSet = getGameSetByGameId(gameId)
    return usableGameSets.includes(gameSet?.id)
  })
}
