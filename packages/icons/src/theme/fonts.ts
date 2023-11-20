import { defineTokens } from '@pandacss/dev'

const sansFont =
  '-apple-system, ui-sans-serif, system-ui,' +
  "BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, 'Helvetica Neue', " +
  "Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', " +
  "'Segoe UI Symbol', 'Noto Color Emoji'"

export const fontTokens = defineTokens.fonts({
  sans: {
    value: sansFont,
  },
  mono: {
    value:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", ' +
      '"Courier New", monospace',
  },
  comic: {
    value: "'Comic Sans', 'Comic Sans MS', 'Chalkboard', 'ChalkboardSE-Regular', " + sansFont,
  },
})
