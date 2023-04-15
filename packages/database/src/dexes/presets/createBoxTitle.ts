import { GameSetId } from '../../games/types'

export function createBoxTitle(
  gameSet: GameSetId,
  prevTitle: string | null | undefined,
  currentBoxNum: number
): string {
  if (gameSet === 'go' || gameSet === 'lgpe') {
    return prevTitle || `Storage System`
  }
  if (gameSet === 'la') {
    return prevTitle || `Pasture ${currentBoxNum}`
  }
  return prevTitle || `Box ${currentBoxNum}`
}
