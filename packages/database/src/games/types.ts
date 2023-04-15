export const GAMESET_IDS: readonly string[] = [
  'rb',
  'y',
  'gs',
  'c',
  'rs',
  'e',
  // "col",
  // "xd",
  'frlg',
  'dp',
  'pt',
  'hgss',
  'bw',
  'b2w2',
  'xy',
  'oras',
  'sm',
  'usum',
  'go',
  'home',
  'lgpe',
  'swsh',
  'bdsp',
  'la',
  'sv',
] as const

export const GAME_IDS: readonly string[] = [
  'home',
  'go',
  'sv-s',
  'sv-v',
  'la',
  'bdsp-bd',
  'bdsp-sp',
  'swsh-sw',
  'swsh-sh',
  'lgpe-lgp',
  'lgpe-lge',
  'usum-us',
  'usum-um',
  'sm-s',
  'sm-m',
  'oras-or',
  'oras-as',
  'xy-x',
  'xy-y',
  'b2w2-b2',
  'b2w2-w2',
  'bw-b',
  'bw-w',
  'hgss-hg',
  'hgss-ss',
  'pt',
  'dp-d',
  'dp-p',
  'frlg-fr',
  'frlg-lg',
  // "col",
  // "xd",
  'e',
  'rs-r',
  'rs-s',
  'c',
  'gs-g',
  'gs-s',
  'y',
  'rb-r',
  'rb-b',
] as const

export const SUPPORTED_GAME_SETS: GameSetId[] = Array.from(GAMESET_IDS)
export const SUPPORTED_GAMES: GameId[] = Array.from(GAME_IDS)

export type GameSetId = (typeof GAMESET_IDS)[number]
export type GameId = (typeof GAME_IDS)[number]
export type GameSymbol =
  | 'caught'
  | 'shiny'
  | 'pokerus'
  | 'pokerus_cured'
  | 'gmax'
  | 'alpha'
  | 'shadow'
  | 'purified'
  | 'apex'

export type GameSet = {
  id: GameSetId
  name: string
  codename: string | null
  superset: string
  generation: number
  releaseDate: string
  games: {
    [key: string]: string | unknown
  }
  platforms: string[]
  series: string
  region: string
  originMark: string // TODO add OriginMark type
  pokedexes: string[]
  nationalMaxNum: number | null
  hasShinies: boolean
  storage: {
    boxes: number
    boxCapacity: number
    symbols: GameSymbol[]
  } | null
}

export type GameBasicInfo = {
  id: GameId
  name: string
  setId: GameSetId
  supersetId: string
}

export type GameDict = { [id in GameId]: GameBasicInfo }
export type GameSetDict = { [id in GameSetId]: GameSet }
