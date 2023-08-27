import { GameSetId } from '../../../game-sets/ids'

export function createBoxTitle(
  gameSet: GameSetId,
  prevTitle: string | null | undefined,
  currentBoxNum: number
): string {
  if (gameSet === 'go' || gameSet === 'lgpe') {
    return prevTitle || `Storage System`
  }
  if (prevTitle?.startsWith('Pasture') || prevTitle?.startsWith('Box')) {
    return createDefaultBoxTitle(gameSet, currentBoxNum)
  }
  return prevTitle ?? createDefaultBoxTitle(gameSet, currentBoxNum)
}

export function createDefaultBoxTitle(gameSet: GameSetId, currentBoxNum: number): string {
  if (gameSet === 'go' || gameSet === 'lgpe') {
    return `Storage System`
  }
  if (gameSet === 'la') {
    return `Pasture ${currentBoxNum}`
  }
  return `Box ${currentBoxNum}`
}
