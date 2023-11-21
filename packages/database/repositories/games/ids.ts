// autogenerated with @pkg/database/lib/codegen/codegen.cjs
export const _gameIds = [
  'rb-r',
  'rb-b',
  'y',
  'gs-g',
  'gs-s',
  'c',
  'rs-r',
  'rs-s',
  'frlg-fr',
  'frlg-lg',
  'e',
  'dp-d',
  'dp-p',
  'pt',
  'hgss-hg',
  'hgss-ss',
  'bw-b',
  'bw-w',
  'b2w2-b2',
  'b2w2-w2',
  'xy-x',
  'xy-y',
  'oras-or',
  'oras-as',
  'go',
  'sm-s',
  'sm-m',
  'usum-us',
  'usum-um',
  'lgpe-lgp',
  'lgpe-lge',
  'swsh-sw',
  'swsh-sh',
  'home',
  'bdsp-bd',
  'bdsp-sp',
  'la',
  'sv-s',
  'sv-v',
] as const

type GameId = (typeof _gameIds)[number]

export function getGameIds(): readonly GameId[] {
  return _gameIds
}
