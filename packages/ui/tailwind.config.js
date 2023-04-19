const { aliases, colors } = require('./theme/colors.json')

const colorsWithAliases = Object.entries(aliases).reduce(
  (acc, [alias, colorKey]) => {
    acc[alias] = colors[colorKey]
    return acc
  },
  { ...colors }
)

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,ts,jsx,tsx}', '!./node_modules'],
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
      colors: colorsWithAliases,
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
  plugins: [require('@tailwindcss/typography')],
}
