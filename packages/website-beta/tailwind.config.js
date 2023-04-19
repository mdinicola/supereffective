const baseConfig = require('../ui/tailwind.config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './../ui/components/**/*.{js,ts,jsx,tsx}',
    '!./../ui/node_modules',
    '!./node_modules',
  ],
}
