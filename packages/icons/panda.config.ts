import { defineConfig } from '@pandacss/dev'

import {
  cascadeLayerNames,
  colorTokens,
  fontTokens,
  globalCss,
  semanticColors,
  staticCss,
  THEME_ROOT_CLASS,
} from '@/theme'
import { conditionTokens } from '@/theme/conditions'

// https://panda-css.com/docs/installation/vite
// https://panda-css.com/docs/references/config

const CSS_VARIABLE_ROOT = `:where(.${THEME_ROOT_CLASS})`

const pandaConfig = defineConfig({
  jsxFramework: 'react',
  presets: ['@pandacss/preset-base', '@pandacss/preset-panda'],

  cwd: __dirname,
  // Whether to use css reset
  preflight: false,

  // shorten css class names:
  hash: true, //process.env.NODE_ENV === 'production',

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: ['./src/theme/**/*.{js,jsx,ts,tsx}'],

  // The output directory for your css system
  outdir: 'styled-system',

  // Ensure modules are resolved correctly with esbuild/tsup (by using .js extension)
  outExtension: 'js',

  cssVarRoot: CSS_VARIABLE_ROOT,
  layers: cascadeLayerNames,
  globalCss,
  staticCss,
  conditions: {
    extend: conditionTokens,
  },
  theme: {
    extend: {
      semanticTokens: {
        colors: semanticColors,
      },
      tokens: {
        colors: colorTokens,
        fonts: fontTokens,
      },
    },
  },
})

export default pandaConfig
