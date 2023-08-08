import { UtilityConfig } from '@pandacss/types'

const utilities: UtilityConfig = {
  bgColor: {
    property: 'backgroundColor',
    shorthand: 'bgc',
    values: 'colors',
    transform(value) {
      return { backgroundColor: value }
    },
  },
}

export default utilities
