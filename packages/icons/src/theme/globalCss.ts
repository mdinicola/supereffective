import type { GlobalStyleObject } from '@pandacss/types'

export const globalCss: GlobalStyleObject = {
  // extra css to be injected into the global scope
  ':where(.dex-tracker-ui)': {
    'svg, img': {
      display: 'inline-block',
    },
  },
}
