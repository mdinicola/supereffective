import errors from './errors'
import format_v4 from './formats/v4.json'
import { LivingDexFormatConfig, LivingDexFormats, LivingDexFormatVersion } from './types'

const livingdexFormats: LivingDexFormats = new Map()
livingdexFormats.set('v4', format_v4 as LivingDexFormatConfig)

export function getLivingDexFormat(format: LivingDexFormatVersion): LivingDexFormatConfig {
  const formatConfig = livingdexFormats.get(format)
  if (!formatConfig) {
    throw new Error('Incompatible Living Dex format: ' + format, errors.LIVINGDEX.INVALID_FORMAT)
  }

  return formatConfig
}
