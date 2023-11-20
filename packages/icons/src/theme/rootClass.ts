import type { CascadeLayers } from '@pandacss/types'

export const THEME_ROOT_CLASS = 'dex-tracker-ui'

export const cascadeLayerNames: CascadeLayers = {
  base: `${THEME_ROOT_CLASS}--base`,
  recipes: `${THEME_ROOT_CLASS}--recipes`,
  reset: `${THEME_ROOT_CLASS}--reset`,
  utilities: `${THEME_ROOT_CLASS}--utilities`,
  tokens: `${THEME_ROOT_CLASS}--tokens`,
}
