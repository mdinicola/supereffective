import { cva } from '@/styled-system/css'

const buttonRecipe = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    py: '1.5',
    px: 6,
    mr: '3px',
    mb: '3px',
    _last: {
      mr: 0,
    },
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    borderRadius: 'md',
    lineHeight: '1.5rem',
    verticalAlign: 'text-bottom',
    textAlign: 'center',
    fontSize: 'inherit',
    fontWeight: 'medium',
    _motionSafe: {
      transition: 'all 0.2s',
    },
    cursor: 'pointer',
    border: '2px solid token(colors.gray.950)',
    bg: 'gray.100',
    color: 'gray.900',
    boxShadow: '3px 3px 0px 0px token(colors.gray.950)',
    textDecoration: 'none',
    _hover: {
      bg: 'gray.50',
      borderColor: 'gray.950',
    },
    '&:active, &.pressed': {
      transform: 'translate(3px, 3px)',
      boxShadow: 'none',
    },
    _focusVisible: {
      outline: 'none',
      borderColor: 'blue.300',
    },
    _focusWithin: {
      outline: 'none',
      borderColor: 'blue.300',
      _hover: {
        borderColor: 'blue.300',
      },
    },
    '&:disabled, &[disabled]': {
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
  variants: {
    color: {
      black: {
        bg: 'neutral.900',
        color: 'gray.100',
        borderColor: 'neutral.950',
        boxShadow: '3px 3px 0px 0px token(colors.neutral.950)',
        _hover: {
          bg: 'neutral.800',
        },
      },
      red: {
        bg: 'red.500',
        color: 'gray.900',
        _hover: {
          bg: 'red.400',
        },
      },
      green: {
        bg: 'green.500',
        color: 'gray.900',
        _hover: {
          bg: 'green.400',
        },
      },
      blue: {
        bg: 'blue.500',
        color: 'gray.900',
        _hover: {
          bg: 'blue.400',
        },
      },
      yellow: {
        bg: 'yellow.300',
        color: 'gray.900',
        _hover: {
          bg: 'yellow.200',
        },
      },
      gold: {
        bg: 'gold.500',
        color: 'gray.900',
        _hover: {
          bg: 'gold.400',
        },
      },
      orange: {
        bg: 'orange.500',
        color: 'gray.900',
        _hover: {
          bg: 'orange.400',
        },
      },
      pink: {
        bg: 'pink.500',
        color: 'gray.900',
        _hover: {
          bg: 'pink.400',
        },
      },
      purple: {
        bg: 'purple.500',
        color: 'gray.900',
        _hover: {
          bg: 'purple.400',
        },
      },
      teal: {
        bg: 'teal.500',
        color: 'gray.900',
        _hover: {
          bg: 'teal.400',
        },
      },
      brown: {
        bg: 'brown.500',
        color: 'gray.900',
        _hover: {
          bg: 'brown.400',
        },
      },
      transparent: {
        bg: 'none',
        p: 0,
        m: 0,
        mr: 0,
        mb: 0,
        color: 'inherit',
        boxShadow: 'none',
        border: 'none',
        '&.debug-mode': {
          outline: '1px solid fuchsia',
        },
        _hover: {
          bg: 'none',
          transform: 'scale(1.1)',
        },
      },
    },
    size: {
      sm: { fontSize: 'sm', py: '0.5', px: 4 },
      lg: { fontSize: 'lg', py: 3, px: 9, fontWeight: 'semibold', borderRadius: 'lg' },
      xl: { fontSize: 'xl', py: 5, px: 12, fontWeight: 'bold', borderRadius: 'xl' },
    },
  },
})

export type ButtonRecipeProps = Parameters<typeof buttonRecipe>[0]

export { buttonRecipe }
