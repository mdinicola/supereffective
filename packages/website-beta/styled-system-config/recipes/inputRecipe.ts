import { cva } from '@/styled-system/css'

const inputRecipe = cva({
  base: {
    display: 'block',
    width: '100%',
    py: '1.5',
    px: 3,
    mr: '3px',
    mb: '3px',
    _last: {
      mr: 0,
    },
    WebkitTapHighlightColor: 'transparent',
    lineHeight: '1.5rem',
    verticalAlign: 'text-bottom',
    textAlign: 'left',
    fontSize: 'sm',
    fontWeight: 'medium',
    _motionSafe: {
      transition: 'border 0.2s',
    },
    borderRadius: 'md',
    border: '1px solid token(colors.gray.600)',
    bg: 'gray.950',
    color: 'gray.100',
    boxShadow: '1px 1px 0px 0px token(colors.gray.950)',
    textDecoration: 'none',
    _focusVisible: {
      outline: 'none',
      borderColor: 'blue.300',
    },
  },
  variants: {
    color: {
      black: {
        borderColor: 'neutral.800',
        bg: 'neutral.950',
      },
      red: {
        borderColor: 'red.500',
      },
      green: {
        borderColor: 'green.500',
      },
      blue: {
        borderColor: 'blue.500',
      },
      yellow: {
        borderColor: 'yellow.300',
      },
      gold: {
        borderColor: 'gold.500',
      },
      orange: {
        borderColor: 'orange.500',
      },
      pink: {
        borderColor: 'pink.500',
      },
      purple: {
        borderColor: 'purple.500',
      },
      teal: {
        borderColor: 'teal.500',
      },
      brown: {
        borderColor: 'brown.500',
      },
    },
    size: {
      sm: { fontSize: 'sm', py: '0.5', px: 4 },
      lg: { fontSize: 'lg', py: 3, px: 9, fontWeight: 'semibold', borderRadius: 'lg' },
      xl: { fontSize: 'xl', py: 5, px: 12, fontWeight: 'bold', borderRadius: 'xl' },
    },
  },
})

export type InputRecipeProps = Parameters<typeof inputRecipe>[0]

export { inputRecipe }
