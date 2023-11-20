import type { StaticCssOptions } from '@pandacss/types'

import { pokemonTypeColorTokens } from './colors/pokemonTypeColors'

export const staticCss: StaticCssOptions = {
  css: [
    {
      properties: {
        // ✅ Good: Pre-generate the styles for the color
        backgroundColor: ['*', ...Object.keys(pokemonTypeColorTokens)],
        color: ['*', ...Object.keys(pokemonTypeColorTokens)],
        fill: ['*', ...Object.keys(pokemonTypeColorTokens)],
      },
    },
  ],
}
