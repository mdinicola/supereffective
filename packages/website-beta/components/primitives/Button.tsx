'use client'

import React, { useRef } from 'react'
import { AriaButtonProps, useButton } from 'react-aria'
import Link from 'next/link'

import { AnchorAttributes, ButtonAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { buttonRecipe, ButtonRecipeProps } from '@/styled-system-config/recipes/buttonRecipe'
import { css } from '@/styled-system/css'

type ButtonProps = Omit<
  Omit<ButtonAttributes | AnchorAttributes, 'size'> & AriaButtonProps & ButtonRecipeProps,
  'onClick'
> & {
  hardLink?: boolean
}

export default function Button({ href, hardLink, color, size, ...rest }: ButtonProps) {
  const ref = useRef(null)
  const isInternalLink = (href && !href.startsWith('http')) || (href && href.startsWith('#'))
  const isExternalLink = href && href.startsWith('http')

  if (rest.title) {
    rest['aria-label'] = rest.title
  }

  const defaultOnPress = (e: any) => {
    if (isInternalLink && !href.startsWith('#')) {
      if (navigating) {
        e.preventDefault()
        e.stopPropagation()
        return
      }
      setNavigating(true)
      setTimeout(() => {
        setNavigating(false)
      }, 3000)
    }
  }
  const [navigating, setNavigating] = React.useState(false)
  const { buttonProps: ariaProps, isPressed } = useButton(
    {
      ...rest,
      onPress: e => {
        defaultOnPress(e)
        rest.onPress?.(e)
      },
      elementType: href ? 'a' : 'button',
    },
    ref
  )
  const classNames = cn(
    buttonRecipe({
      color,
      size,
    }),
    [isPressed, 'pressed'],
    [
      navigating && isInternalLink,
      css({
        animation: 'pulse 1s ease infinite',
      }),
    ],
    rest.className
  )

  if (isInternalLink) {
    if (hardLink) {
      return (
        <a
          className={classNames}
          tabIndex={0}
          {...ariaProps}
          title={rest.title}
          href={href}
          ref={ref}
        >
          {rest.children}
        </a>
      )
    }
    return (
      <Link
        className={classNames}
        tabIndex={0}
        {...ariaProps}
        title={rest.title}
        href={href}
        ref={ref}
      >
        {rest.children}
      </Link>
    )
  }
  if (isExternalLink) {
    return (
      <a
        className={classNames}
        tabIndex={0}
        {...ariaProps}
        title={rest.title}
        href={href}
        target="_blank"
        rel={`${rest.rel || 'external noopener noreferrer'}`}
        ref={ref}
      >
        {rest.children}
      </a>
    )
  }

  return (
    <button className={classNames} tabIndex={0} {...ariaProps} ref={ref}>
      {rest.children}
    </button>
  )
}
