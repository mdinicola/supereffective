import colorsConfig from './colors.json'

// Color palette created with https://components.ai/theme/vzNxm4OS3mU9OzZp6yQI?themeTab=colors

const { aliases, colors } = colorsConfig

type Colors = typeof colors

type ThemeColors = Colors & {
  [key in keyof typeof aliases]: Colors[keyof Colors]
}

const themeColors: ThemeColors = Object.keys(aliases).reduce(
  (acc, alias) => ({
    ...acc,
    [alias]: (colors as any)[(aliases as any)[alias]],
  }),
  { ...colors } as ThemeColors
)

export default themeColors
