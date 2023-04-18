import { z, ZodType } from 'zod'

import errors from './errors'
import {
  LIVINGDEX_FORMAT_VERSIONS,
  LIVINGDEX_PROP_TYPES,
  LivingDexBoxByFormat,
  LivingDexFormatConfig,
  LivingDexMetadata,
  LivingDexPropType,
} from './types'

export const createLivingDexTypeValidator = (typeName: LivingDexPropType): ZodType => {
  const slugType = z
    .string()
    .regex(/[a-zA-Z0-9-_]+/)
    .max(50)

  switch (typeName) {
    case 'boolean':
      return z.boolean()
    case 'number':
      return z.number()
    case 'number[]':
      return z.array(z.number())
    case 'number:int':
      return z.number().int()
    case 'number:int[]':
      return z.array(z.number().int())
    case 'string':
      return z.string()
    case 'string[]':
      return z.array(z.string())
    case 'string:slug':
      return slugType
    case 'string:slug[]':
      return z.array(slugType)
    case 'string:text':
      return z.string().max(160)
    default:
      throw new Error('Invalid property type: ' + typeName, errors.LIVINGDEX.INVALID_PROP_TYPE)
  }
}

export const createLivingDexFormatValidator = (): ZodType<LivingDexFormatConfig> => {
  const propsTypesValidator = z.array(z.tuple([z.string(), z.enum(LIVINGDEX_PROP_TYPES)]))

  return z.object({
    version: z.enum(LIVINGDEX_FORMAT_VERSIONS),
    arrayDelimiters: z.tuple([z.string().length(1), z.string().length(1)]),
    arraySeparator: z.string().length(1),
    propertySeparator: z.string().length(1),
    boxPrefix: z.string().min(1).max(2),
    pokemonPrefix: z.string().min(1).max(2),
    boxProperties: propsTypesValidator,
    pokemonProperties: propsTypesValidator,
  }) as ZodType<LivingDexFormatConfig>
}

export const createLivingDexMetadataValidator = (): ZodType<LivingDexMetadata> => {
  return z.object({
    $id: z.string(),
    format: z.enum(LIVINGDEX_FORMAT_VERSIONS),
    title: z.string(),
    gameId: z.string(),
    ownerId: z.string(), //.regex(/^@.+/),
    creationTime: z.string().datetime(),
    lastUpdateTime: z.string().datetime(),
  })
}

export const createLivingDexBoxValidator = (
  format: LivingDexFormatConfig
): ZodType<LivingDexBoxByFormat<typeof format.version>> => {
  const boxValidator = z.object({})
  const pkmValidator = z.object({})

  for (const prop of format.boxProperties) {
    const [propName, typeName] = prop
    boxValidator.setKey(propName, createLivingDexTypeValidator(typeName))
  }

  // TODO: improve/refactor this part (required Pkm Props):
  const requiredPkmProps = ['id', 'captured', 'shiny']

  for (const prop of format.pokemonProperties) {
    const [propName, typeName] = prop
    const pkmPropValidator = createLivingDexTypeValidator(typeName)
    pkmValidator.setKey(
      propName,
      requiredPkmProps.includes(propName) ? pkmPropValidator : pkmPropValidator.optional()
    )
  }

  boxValidator.setKey('pokemon', z.array(pkmValidator.or(z.null())))

  return boxValidator as unknown as ZodType
}
