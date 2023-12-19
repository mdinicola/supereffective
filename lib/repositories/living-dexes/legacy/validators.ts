import { z } from 'zod'

import { _gameSetIds } from '../../game-sets/ids'
import { _gameIds } from '../../games/ids'
import { _pokemonIds } from '../../pokemon/ids'
import { IDSchema, UserCreatedTitleSchema } from '../../validators'

export type BaseUserDocument = {
  id?: string
  userId?: string
  createdAt?: Date
  updatedAt?: Date
} & Record<string, unknown>

export type DexPokemon = {
  pid: string
  caught: boolean
  gmax: boolean
  alpha: boolean
  shiny: boolean
  shinyLocked?: boolean
  shinyBase?: string | null
}

export type NullableDexPokemon = DexPokemon | null

export type DexPokemonList = Array<NullableDexPokemon>

export type DexBox = {
  title?: string
  pokemon: DexPokemonList
  shiny: boolean
}

export type StorableDex = {
  title: string
  sver: number
  preset: [string, string, number] | [string, string, string, number]
  caught: [number, number]
  caughtShiny: [number, number]
  boxes: Array<DexBox>
} & BaseUserDocument

export type LoadedDex = {
  title: string
  schemaVersion: number
  gameId: string
  gameSetId: string
  presetId: string
  presetVersion: number
  caughtRegular: number
  totalRegular: number
  caughtShiny: number
  totalShiny: number
  boxes: DexBox[]
  lostPokemon: DexPokemonList
} & BaseUserDocument

export type StorableDexList = Array<StorableDex>
export type LoadedDexList = Array<LoadedDex>

// ---------

export const GameIdSchema = z.enum(_gameIds)
export const GameSetIdSchema = z.enum(_gameSetIds)
export const PokemonIdSchema = z.enum(_pokemonIds)

export const BaseUserDocumentSchema = z
  .object({
    id: IDSchema.optional(),
    userId: IDSchema.optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  .strict()

export const DexPokemonSchema = z.object({
  pid: PokemonIdSchema,
  caught: z.boolean(),
  gmax: z.boolean(),
  alpha: z.boolean(),
  shiny: z.boolean(),
  shinyLocked: z.boolean().optional(),
  shinyBase: PokemonIdSchema.nullable(),
})

export const NullableDexPokemonSchema = z.union([DexPokemonSchema, z.null()])

export const DexPokemonListSchema = z.array(NullableDexPokemonSchema)

export const DexBoxSchema = z.object({
  title: UserCreatedTitleSchema.optional(),
  pokemon: DexPokemonListSchema,
  shiny: z.boolean(),
})

export const StorableDexSchema = BaseUserDocumentSchema.merge(
  z.object({
    title: UserCreatedTitleSchema,
    sver: z.number(),
    preset: z.union([
      z.tuple([GameIdSchema, z.string(), z.number()]),
      z.tuple([GameSetIdSchema, GameIdSchema, z.string(), z.number()]),
    ]),
    caught: z.tuple([z.number(), z.number()]),
    caughtShiny: z.tuple([z.number(), z.number()]),
    boxes: z.array(DexBoxSchema),
  })
)

export const LoadedDexSchema = BaseUserDocumentSchema.merge(
  z.object({
    title: UserCreatedTitleSchema,
    schemaVersion: z.number(),
    gameId: GameIdSchema,
    gameSetId: GameSetIdSchema,
    presetId: z.string(),
    presetVersion: z.number(),
    caughtRegular: z.number(),
    totalRegular: z.number(),
    caughtShiny: z.number(),
    totalShiny: z.number(),
    boxes: z.array(DexBoxSchema),
    lostPokemon: DexPokemonListSchema,
  })
)

export const StorableDexListSchema = z.array(StorableDexSchema)
export const LoadedDexListSchema = z.array(LoadedDexSchema)
