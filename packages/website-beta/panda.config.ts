import { defineConfig, defineGlobalStyles } from '@pandacss/dev'

import colors from '@/lib/panda/colors'
import globalCss from '@/lib/panda/globalCss'
import patterns from '@/lib/panda/patterns'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // shorten css class names:
  hash: true,

  // Where to look for your css declarations
  include: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
  ],

  // Files to exclude
  exclude: [],

  // global CSS applied to the base @layer
  globalCss: defineGlobalStyles(globalCss),

  // extend reusable patterns:
  patterns: patterns,

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: colors,
      },
    },
  },

  presets: ['@pandacss/dev/presets'],

  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',
})
