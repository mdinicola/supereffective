export const LIVINGDEX_FORMAT_VERSIONS = ['v4'] as const

export type LivingDexFormatVersion = (typeof LIVINGDEX_FORMAT_VERSIONS)[number]

export const LIVINGDEX_FORMAT_VERSION_LAST: LivingDexFormatVersion = 'v4'

export const LIVINGDEX_PROP_TYPES = [
  'boolean',
  'number',
  'number[]',
  'number:int',
  'number:int[]',
  'string',
  'string[]',
  'string:slug',
  'string:slug[]',
  'string:text',
] as const

export type LivingDexPropType = (typeof LIVINGDEX_PROP_TYPES)[number]

export interface LivingDex extends LivingDexMetadata {
  boxes: LivingDexBox[]
}

export interface LivingDexMetadata {
  $id: string
  format: LivingDexFormatVersion
  title: string
  gameId: string
  ownerId: string
  creationTime: string
  lastUpdateTime: string
}

export type LivingDexBoxByFormat<T extends LivingDexFormatVersion> = T extends 'v4'
  ? LivingDexBox
  : never

export interface LivingDexBox {
  title: string
  shiny: boolean
  pokemon: (LivingDexPokemon | null)[]
}

export interface LivingDexPokemon {
  id: string
  captured: boolean
  shiny: boolean
  originMark?: string
  nature?: string
  pokerus?: 'infected' | 'cured'
  level?: number
  dynamaxLevel?: number
  teraType?: string
  ball?: string
  language?: string
  evs: number[]
  ivs: number[]
  moves: string[]
  emblemMarks: string[]
}

export interface LivingDexGameConfig {
  gameId: string
  boxes: number
  boxCapacity: number
}

export interface LivingDexFormatConfig {
  version: LivingDexFormatVersion
  arrayDelimiters: [string, string]
  arraySeparator: string
  propertySeparator: string
  boxPrefix: string
  pokemonPrefix: string
  boxProperties: [keyof LivingDexBox, LivingDexPropType][]
  pokemonProperties: [keyof LivingDexPokemon, LivingDexPropType][]
}

export type LivingDexFormats = Map<LivingDexFormatVersion, LivingDexFormatConfig>
