// Color palette created with https://components.ai/theme/vzNxm4OS3mU9OzZp6yQI?tab=export&themeTab=colors
const colorsConfig = require('./config/colors.json')
const { primary, accent, ...colors } = colorsConfig

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './config/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    '!./node_modules',
    // Path to the tremor module
    // './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class', "[class~='dark']"], // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        screen: '100dvh',
      },
      colors: {
        primary: colors[primary],
        accent: colors[accent],
        ...colors,
      },
      screens: {
        xs: '360px',
        // => @media (min-width: 360px) { ... }

        sm: '600px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
