import { cva } from '@/styled-system/css'

const menuBarRecipe = cva({
  base: {
    display: 'flex',
    px: 4,
    py: 3,
    gap: 3,
    zIndex: 10,
    userSelect: 'none',
    justifyContent: 'space-between',
    fontSize: 'lg',
    letterSpacing: 'tighter',
    _motionSafe: {
      transition: 'padding 0.2s ease-in-out',
    },
  },
  variants: {
    radius: {
      all: {
        borderRadius: '3xl',
      },
      top: {
        borderTopRadius: '3xl',
      },
      bottom: {
        borderBottomRadius: '3xl',
      },
    },
    theme: {
      light: {
        // bgImage: 'url("/images/bg/sv_pattern_black.png")',
        // bgSize: '40rem',
        color: 'gray.950',
        bgColor: 'gray.300',
      },
      dark: {
        bgImage: 'url("/images/bg/sv_pattern_white.png")',
        bgSize: '50rem',
        color: 'gray.100',
        bgColor: 'gray.800',
      },
    },
  },
  defaultVariants: {
    radius: 'all',
    theme: 'light',
  },
})

export type MenuBarRecipeProps = Parameters<typeof menuBarRecipe>[0]

const menuBarTitleRecipe = cva({
  base: {
    display: 'inline-block',
    fontSize: 'lg',
    letterSpacing: 'tighter',
    fontWeight: '800',
    textDecoration: 'none',
    // truncate:
    maxWidth: 'fit-content',
    minWidth: '1ch',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    // truncate-end.
    py: 2,
  },
})

export type MenuBarTitleRecipeProps = Parameters<typeof menuBarTitleRecipe>[0]

export { menuBarRecipe, menuBarTitleRecipe }
