import { defineConfig } from '@pandacss/dev'

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

  // The output directory for your css system
  outdir: 'styled-system',
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
