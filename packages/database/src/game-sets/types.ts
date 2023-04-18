import { GameId } from '../games/ids'
import { RegionId } from '../regions/ids'
import { GameSetId } from './ids'

export type LegacyGameSetSymbol =
  | 'caught'
  | 'shiny'
  | 'pokerus'
  | 'pokerus_cured'
  | 'gmax'
  | 'alpha'
  | 'shadow'
  | 'purified'
  | 'apex'

export type LegacyGameSet = {
  id: GameSetId
  name: string
  codename: null | string
  superset: string
  generation: number
  releaseDate: string
  games: Record<GameId, string>
  platforms: string[]
  series: string
  region: RegionId
  originMark: string
  pokedexes: string[]
  hasShinies: boolean
  nationalMaxNum: number | null
  storage: {
    boxes: number
    boxCapacity: number
    symbols: LegacyGameSetSymbol[]
  }
  nationalDex?: null
}

export type LegacyGameSetDict = Record<GameSetId, LegacyGameSet>
