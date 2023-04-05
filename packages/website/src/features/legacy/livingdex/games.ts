import gameList from '#/data/builds/games.json'
import gameSetList from '#/data/sources/games/game-sets.json'
import { PresetDex, PresetDexMap } from '#/features/legacy/livingdex/livingdex'

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

export const SUPPORTED_GAME_SETS: GameSetId[] = Array.from(GAMESET_IDS)
export const SUPPORTED_GAMES: GameId[] = Array.from(GAME_IDS) //.filter((gameId) => !/^sv-/.test(gameId))

export interface GameSet {
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

export const GET_ABS_GAMEID = (gameId: string): GameId => {
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

export interface GameListItem {
  id: GameId
  name: string
  setId: GameSetId
  supersetId: string
}

// map gameList by id
export const GAMES: { [id in GameId]: GameListItem } = (gameList as GameListItem[]).reduce(
  (acc: any, item) => {
    acc[item.id] = item
    return acc
  },
  {}
)
export const GAME_SETS: { [id: string]: GameSet } = (gameSetList as GameSet[]).reduce(
  (acc: any, item) => {
    acc[item.id] = item
    return acc
  },
  {}
)

export const getGame = (id: GameId): GameListItem => {
  const absId = GET_ABS_GAMEID(id)
  const data = GAMES[absId]
  if (data === undefined) {
    throw new Error(`Game ${absId} not found`)
  }
  return data
}
export const getGameSet = (id: GameId): GameSet => {
  const data = GAME_SETS[getGame(id).setId]
  if (data === undefined) {
    throw new Error(`Game ${id} not found`)
  }
  return data
}

export const getPresetsForGame = (
  gameId: GameId,
  presets: PresetDexMap
): { [presetId: string]: PresetDex } => {
  return presets[getGameSet(gameId).id] || {}
}

export const getPresetForGame = (
  gameId: GameId,
  presetId: string,
  presets: PresetDexMap
): PresetDex | undefined => {
  return getPresetForGameSet(getGameSet(gameId).id, presetId, presets)
}

export const getPresetForGameSet = (
  gameSetId: GameSetId,
  presetId: string,
  presets: PresetDexMap
): PresetDex | undefined => {
  return presets[gameSetId] ? presets[gameSetId][presetId] : undefined
}

// export const getGamesFromPreset = (preset: PresetDex): (GameListItem & { set: GameSet })[] => {
//   const gameSet = GAME_SETS[preset.gameSet]
//   return Object.keys(gameSet.games).map((gameId) => {
//     const game = GAMES[gameId as GameId]
//     return { ...game, set: gameSet }
//   })
// }
//
// export const getGamesFromPresetMap = (presets: PresetDexMap): (GameListItem & { set: GameSet })[] =>
//   Object.keys(presets).flatMap((gameSetId) => {
//     const gameSet = GAME_SETS[gameSetId]
//     return Object.keys(gameSet.games).map((gameId) => {
//       const game = GAMES[gameId as GameId]
//       return { ...game, set: gameSet }
//     })
//   })
