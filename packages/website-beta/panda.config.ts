import { defineConfig, defineGlobalStyles } from '@pandacss/dev'

// applied to the base @layer
const globalCss = defineGlobalStyles({
  '*': {
    pos: 'relative',
    boxSizing: 'border-box',
  },
  'html, body': {
    color: 'gray.900',
    maxWidth: '100vw',
    overflowX: 'hidden',
    overscrollBehavior: 'none',
    bg: 'gray.900',
  },
  // '.standalone-mode .main-layout': {
  //   minH: '100vh!',
  //   '@media (orientation: landscape)': {
  //     flexDirection: 'row!',
  //     // px: 12,
  //   },
  // },
  // '.standalone-mode .main-header': {
  //   pt: '12!',
  //   '@media (orientation: landscape)': {
  //     pt: '4!',
  //     pl: '12!',
  //   },
  // },
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

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          // pink: {
          //   '100': { value: '#EFC8DD' },
          //   '200': { value: '#e5abcb' },
          //   '300': { value: '#db8db9' },
          //   '400': { value: '#cf6ea8' },
          //   '500': { value: '#c34e97' },
          //   '600': { value: '#a64481' },
          //   '700': { value: '#8a3b6b' },
          //   '800': { value: '#6f3257' },
          //   '900': { value: '#562843' },
          //   '950': { value: '#3d1f30' },
          // },
          green: {
            '100': { value: '#cddcbc' },
            '200': { value: '#b3ca99' },
            '300': { value: '#98b878' },
            '400': { value: '#7ea656' },
            '500': { value: '#639533' },
            '600': { value: '#557f2e' },
            '700': { value: '#486a28' },
            '800': { value: '#3c5622' },
            '900': { value: '#2f431d' },
            '950': { value: '#233017' },
          },
          brown: {
            '100': { value: '#e9c4b4' },
            '200': { value: '#dba68e' },
            '300': { value: '#cc886a' },
            '400': { value: '#ba6b46' },
            '500': { value: '#a84d24' },
            '600': { value: '#904321' },
            '700': { value: '#78391d' },
            '800': { value: '#62301a' },
            '900': { value: '#4c2616' },
            '950': { value: '#371d12' },
          },
          gold: {
            '100': { value: '#fdebbf' },
            '200': { value: '#fae09d' },
            '300': { value: '#f6d67a' },
            '400': { value: '#f0cc56' },
            '500': { value: '#eac228' },
            '600': { value: '#c7a526' },
            '700': { value: '#a58924' },
            '800': { value: '#846e20' },
            '900': { value: '#65541c' },
            '950': { value: '#473b17' },
          },
          silver: {
            '100': { value: '#dee9f8' },
            '200': { value: '#ccdef4' },
            '300': { value: '#bbd2f0' },
            '400': { value: '#a9c7ec' },
            '500': { value: '#96bce8' },
            '600': { value: '#80a0c5' },
            '700': { value: '#6b85a3' },
            '800': { value: '#576b82' },
            '900': { value: '#445263' },
            '950': { value: '#313a45' },
          },
          teal: {
            '100': { value: '#c6e5e1' },
            '200': { value: '#a7d7d2' },
            '300': { value: '#86cac2' },
            '400': { value: '#63bcb4' },
            '500': { value: '#37aea5' },
            '600': { value: '#33948d' },
            '700': { value: '#2e7c75' },
            '800': { value: '#29645e' },
            '900': { value: '#234d49' },
            '950': { value: '#1c3734' },
          },
          blue: {
            '100': { value: '#c6d9f5' },
            '200': { value: '#a6c5f0' },
            '300': { value: '#84b2ea' },
            '400': { value: '#5e9fe5' },
            '500': { value: '#228ddf' },
            '600': { value: '#2579bd' },
            '700': { value: '#25659d' },
            '800': { value: '#23527d' },
            '900': { value: '#1f3f5f' },
            '950': { value: '#1a2e43' },
          },
          purple: {
            '100': { value: '#e3dbf9' },
            '200': { value: '#d4c8f6' },
            '300': { value: '#c5b6f2' },
            '400': { value: '#b6a4ef' },
            '500': { value: '#a692eb' },
            '600': { value: '#8e7dc8' },
            '700': { value: '#7768a5' },
            '800': { value: '#605484' },
            '900': { value: '#4a4164' },
            '950': { value: '#352f46' },
          },
          scarlet: {
            '100': { value: '#ffc7cb' },
            '200': { value: '#fca8b0' },
            '300': { value: '#f88996' },
            '400': { value: '#f1677d' },
            '500': { value: '#e93e65' },
            '600': { value: '#c63857' },
            '700': { value: '#a53249' },
            '800': { value: '#852b3c' },
            '900': { value: '#66242f' },
            '950': { value: '#481d23' },
          },
          violet: {
            '100': { value: '#c7baea' },
            '200': { value: '#a997de' },
            '300': { value: '#8b77d1' },
            '400': { value: '#6e5bc0' },
            '500': { value: '#5444ab' },
            '600': { value: '#443697' },
            '700': { value: '#372b81' },
            '800': { value: '#2d2369' },
            '900': { value: '#251c51' },
            '950': { value: '#1d163a' },
          },
        },
      },
    },
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
