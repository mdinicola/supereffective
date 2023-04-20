// autogenerated by @pkg/database/src/common/codegen.js
const _pokemonTypeIds = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
] as const

export type PokemonTypeId = (typeof _pokemonTypeIds)[number]

export function getPokemonTypeIds(): readonly PokemonTypeId[] {
  return _pokemonTypeIds
}