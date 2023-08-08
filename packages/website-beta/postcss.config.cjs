/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@pandacss/dev/postcss': {},
    '@csstools/postcss-cascade-layers': {},
    '@csstools/postcss-color-mix-function': {},
  },
}

/*
  "browserslist": [
    "defaults and supports es6-module",
    "maintained node versions"
  ],

  // 89.1% global coverage:
  // "> 0.2% and not dead and supports css-cascade-layers"

  // 90.6% global coverage:
  // "> 0.2% and not dead and supports es6-module",



  postcssPresetEnv({
    "browsers": [
      "> 0.2% and not dead"
    ],
    "stage": 3
  })
*/

module.exports = config
