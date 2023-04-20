// autogenerated by @pkg/database/src/common/codegen.js
const _pokedexIds = [
  'national',
  'kanto',
  'johto',
  'hoenn',
  'sinnoh',
  'sinnoh-pt',
  'johto-hgss',
  'unova',
  'unova-b2w2',
  'kalos-central',
  'kalos-coastal',
  'kalos-mountain',
  'hoenn-oras',
  'alola',
  'alola-melemele',
  'alola-akala',
  'alola-ulaula',
  'alola-poni',
  'alola-usum',
  'alola-melemele-usum',
  'alola-akala-usum',
  'alola-ulaula-usum',
  'alola-poni-usum',
  'kanto-lgpe',
  'galar',
  'galar-isle-armor',
  'galar-crown-tundra',
  'hisui',
  'hisui-obsidian',
  'hisui-crimson',
  'hisui-cobalt',
  'hisui-coronet',
  'hisui-alabaster',
  'paldea',
] as const

export type PokedexId = (typeof _pokedexIds)[number]

export function getPokedexIds(): readonly PokedexId[] {
  return _pokedexIds
}