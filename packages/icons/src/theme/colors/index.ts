import { defineTokens } from '@pandacss/dev'

import palette from './palette.json'
import { pokemonTypeColorTokens } from './pokemonTypeColors'

export const paletteColors = palette.colors

const paletteColorTokens = defineTokens.colors(
  palette.colors.reduce(
    (acc, color) => {
      acc[color.name] = {
        value: color.hex,
      }

      return acc
    },
    {} as Record<string, { value: string }>
  )
)

export const colorTokens = defineTokens.colors({
  ...paletteColorTokens,
  ...pokemonTypeColorTokens,
})
