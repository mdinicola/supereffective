import Link, { LinkProps } from 'next/link'

import { AnchorAttributes, ButtonAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { cva } from '@/styled-system/css'

const buttonCva = cva({
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
    fontSize: 'sm',
    fontWeight: 'medium',
    transition: 'all 0.2s',
    cursor: 'pointer',
    border: '2px solid',
    bg: 'gray.100',
    borderColor: 'gray.950',
    color: 'gray.900',
    boxShadow: '3px 3px 0px 0px token(colors.gray.950)',
    _hover: {
      bg: 'gray.200',
      borderColor: 'gray.950',
    },
    _active: {
      transform: 'translate(3px, 3px)',
      boxShadow: 'none',
    },
    _focusVisible: {
      outline: 'none',
      borderColor: 'neutral.50 !important',
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
          bg: 'neutral.950',
        },
      },
      red: {
        bg: 'red.500',
        color: 'gray.900',
        _hover: {
          bg: 'red.600',
        },
      },
      green: {
        bg: 'green.500',
        color: 'gray.900',
        _hover: {
          bg: 'green.600',
        },
      },
      blue: {
        bg: 'blue.500',
        color: 'gray.900',
        _hover: {
          bg: 'blue.600',
        },
      },
      yellow: {
        bg: 'yellow.300',
        color: 'gray.900',
        _hover: {
          bg: 'yellow.600',
        },
      },
      gold: {
        bg: 'gold.500',
        color: 'gray.900',
        _hover: {
          bg: 'gold.600',
        },
      },
      orange: {
        bg: 'orange.500',
        color: 'gray.900',
        _hover: {
          bg: 'orange.600',
        },
      },
      pink: {
        bg: 'pink.500',
        color: 'gray.900',
        _hover: {
          bg: 'pink.600',
        },
      },
      purple: {
        bg: 'purple.500',
        color: 'gray.900',
        _hover: {
          bg: 'purple.600',
        },
      },
      teal: {
        bg: 'teal.500',
        color: 'gray.900',
        _hover: {
          bg: 'teal.600',
        },
      },
      brown: {
        bg: 'brown.500',
        color: 'gray.900',
        _hover: {
          bg: 'brown.600',
        },
      },
    },
    size: {
      sm: { fontSize: 'sm', py: '0.5', px: 4 },
      lg: { fontSize: 'lg', py: 3, px: 9 },
      xl: { fontSize: 'xl', py: 5, px: 12 },
    },
  },
})

type CvaProps = Parameters<typeof buttonCva>[0]
type ButtonProps = (ButtonAttributes | AnchorAttributes) & {
  variant?: CvaProps
}

export default function Button({ href, variant, ...rest }: ButtonProps) {
  const classNames = cn(buttonCva(variant), rest.className)

  if (href && !href.startsWith('http')) {
    // internal link
    const linkProps = rest as LinkProps

    return (
      <Link className={classNames} tabIndex={0} {...linkProps} href={href}>
        {rest.children}
      </Link>
    )
  }
  if (href) {
    // external link
    const anchorProps = rest as AnchorAttributes

    return (
      <a
        className={classNames}
        tabIndex={0}
        {...anchorProps}
        href={href}
        target="_blank"
        rel="norefer nofollow"
      >
        {rest.children}
      </a>
    )
  }

  const buttonProps = rest as ButtonAttributes

  return (
    <button className={classNames} tabIndex={0} {...buttonProps}>
      {rest.children}
    </button>
  )
}
