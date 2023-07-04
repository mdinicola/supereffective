import { defineConfig, defineGlobalStyles } from '@pandacss/dev'

// applied to the base @layer
const globalCss = defineGlobalStyles({
  '*': {
    pos: 'relative',
    boxSizing: 'border-box',
  },
  'html, body': {
    maxWidth: '100vw',
    overflowX: 'hidden',
  },
  a: {
    color: 'blue.600',
    textDecoration: 'underline',
  },
  '@media (prefers-color-scheme: dark)': {
    html: {
      colorScheme: 'dark',
    },
  },
})

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  presets: ['@pandacss/dev/presets'],

  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',
  globalCss,
})

/**
 * 
 * 
 font-family: MonaSans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 1rem;
  letter-spacing: -0.54px; 0.025em;

      --letter-spacings-tighter: -0.05em;
    --letter-spacings-tight: -0.025em;
    --letter-spacings-normal: 0em;
    --letter-spacings-wide: 0.025em;
    --letter-spacings-wider: 0.05em;
    --letter-spacings-widest: 0.1em;
 */
