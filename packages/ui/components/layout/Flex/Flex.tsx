import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'

import { cn } from '../../../lib/classNames'

type FlexProps = {
  children: ReactNode
  horizontal?: 'start' | 'end' | 'center' | 'between' | 'around'
  vertical?: 'start' | 'end' | 'center' | 'stretch'
  flex?: 'auto' | 'none' | 'initial' | '1' | 1
  grow?: 0 | 1
  shrink?: 0 | 1
  wrap?: boolean
  noWrap?: boolean
  gap?: number
  basis?: string
  inline?: boolean
  auto?: boolean
  row?: boolean
  column?: boolean
  reverse?: boolean
  top?: boolean
  bottom?: boolean
  left?: boolean
  right?: boolean
} & HTMLAttributes<HTMLDivElement>

const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const {
    className,
    children,
    horizontal,
    vertical,
    gap,
    wrap,
    noWrap,
    grow,
    shrink,
    basis,
    inline,
    auto,
    row,
    column,
    reverse,
    top,
    bottom,
    left,
    right,
    ...rest
  } = props
  const flexDirection = _getFlexDirection(row ?? false, column ?? false, reverse ?? false)
  const justifyContent = _getJustifyContent(horizontal)
  const alignItems = _getAlignItems(vertical)
  const flexWrap = _getFlexWrap(noWrap, wrap)
  const flexGrow = _getFlexGrowClass(grow)
  const flexShrink = _getFlexShrinkClass(shrink)
  const flexBasis = _getFlexBasis(auto, basis)
  const position = _getPosition({ top, bottom, left, right })
  const gapClass = gap ? `gap-${gap}` : ''
  const classes = cn(
    inline ? 'inline-flex' : 'flex',
    flexDirection,
    justifyContent,
    alignItems,
    gapClass,
    flexWrap,
    flexGrow,
    flexShrink,
    flexBasis,
    position,
    className
  )

  return (
    <div className={classes} ref={ref} {...rest}>
      {children}
    </div>
  )
})

function _getFlexDirection(row: boolean, column: boolean, reverse: boolean): string {
  if (row) {
    return reverse ? 'flex-row-reverse' : 'flex-row'
  }
  if (column) {
    return reverse ? 'flex-col-reverse' : 'flex-col'
  }
  return ''
}

function _getJustifyContent(horizontal?: FlexProps['horizontal']): string {
  switch (horizontal) {
    case 'start':
      return 'justify-start'
    case 'end':
      return 'justify-end'
    case 'center':
      return 'justify-center'
    case 'between':
      return 'justify-between'
    case 'around':
      return 'justify-around'
    default:
      return ''
  }
}

function _getAlignItems(vertical?: FlexProps['vertical']): string {
  switch (vertical) {
    case 'start':
      return 'items-start'
    case 'end':
      return 'items-end'
    case 'center':
      return 'items-center'
    case 'stretch':
      return 'items-stretch'
    default:
      return ''
  }
}

function _getFlexWrap(noWrap?: boolean, wrap?: boolean): string {
  return noWrap ? 'flex-no-wrap' : wrap ? 'flex-wrap' : ''
}

function _getFlexGrowClass(grow?: 0 | 1): string {
  return grow === 0 ? 'grow-0' : grow === 1 ? 'grow-1' : ''
}

function _getFlexShrinkClass(shrink?: 0 | 1): string {
  return shrink === 0 ? 'shrink-0' : shrink === 1 ? 'shrink-1' : ''
}

function _getFlexBasis(auto?: boolean, basis?: string): string {
  return auto ? 'flex-auto' : basis ? `flex-basis-${basis}` : ''
}

function _getPosition({
  top,
  bottom,
  left,
  right,
}: {
  top?: boolean
  bottom?: boolean
  left?: boolean
  right?: boolean
}): string {
  const position = []

  if (top) {
    position.push('top-0')
  }
  if (bottom) {
    position.push('bottom-0')
  }
  if (left) {
    position.push('left-0')
  }
  if (right) {
    position.push('right-0')
  }

  return position.join(' ')
}

Flex.displayName = 'Flex'
export default Flex
