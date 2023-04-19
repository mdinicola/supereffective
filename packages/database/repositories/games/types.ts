import { GameSetId } from '../game-sets/ids'
import { GameId } from './ids'

export type LegacyGame = {
  id: GameId
  name: string
  setId: GameSetId
  supersetId: string
}
export type LegacyGameDict = { [id in GameId]: LegacyGame }
