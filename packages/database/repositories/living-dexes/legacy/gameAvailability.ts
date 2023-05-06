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

export function getUsedGames(userDexes: LoadedDexList): GameId[] {
  const games = new Set<GameId>()
  userDexes.forEach(dex => {
    if (dex.gameId && !games.has(dex.gameId)) {
      games.add(dex.gameId)
    }
  })
  return Array.from(games)
}

export function countGameDexes(userDexes: LoadedDexList, gameId: GameId): number {
  const counter = {
    count: 0,
  }
  userDexes.forEach(dex => {
    if (dex.gameId === gameId) {
      counter.count++
    }
  })
  return counter.count
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

export function hasUsedGameSet(userDexes: LoadedDexList, gameSetId: GameSetId): boolean {
  return getUsedGameSets(userDexes).includes(gameSetId)
}

export function hasUsedGame(userDexes: LoadedDexList, gameId: GameId): boolean {
  return getUsedGames(userDexes).includes(gameId)
}
