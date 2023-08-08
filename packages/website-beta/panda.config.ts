import { defineConfig, defineGlobalStyles } from '@pandacss/dev'

import colors from '@/styled-system-config/colors'
import globalCss from '@/styled-system-config/globalCss'
import patterns from '@/styled-system-config/patterns'
import sizes from '@/styled-system-config/sizes'

import utilities from './styled-system-config/utilities'

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
    './styled-system-config/**/*.{js,jsx,ts,tsx}',
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
        sizes: sizes,
      },
    },
  },
  utilities: {
    extend: utilities,
  },

  conditions: {
    extend: {
      standalone: '@media (display-mode: standalone)',
    },
  },

  presets: ['@pandacss/dev/presets'],

  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',

  studio: {
    logo: '🐼',
    outdir: 'styled-system-docs',
  },
})
