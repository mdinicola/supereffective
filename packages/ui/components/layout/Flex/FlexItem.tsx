import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'

import { cn } from '../../../lib/classNames'
import { ColumnCount } from '../../../lib/types'

type OrderValue = 'none' | 'first' | 'last' | ColumnCount
type FlexValue = 1 | 'auto' | 'initial' | 'none'

type FlexItemProps = {
  children: ReactNode
  flex?: FlexValue
  grow?: 0 | 1
  shrink?: 0 | 1
  order?: OrderValue
} & HTMLAttributes<HTMLDivElement>

const FlexItem = forwardRef<HTMLDivElement, FlexItemProps>(
  ({ children, flex, grow, shrink, order, className, ...rest }: FlexItemProps, ref) => {
    const flexClass = _getFlexClass(flex)
    const flexGrowClass = _getFlexGrowClass(grow)
    const flexShrinkClass = _getFlexShrinkClass(shrink)
    const orderClass = _getOrderClass(order)
    const classes = cn(flexClass, flexGrowClass, flexShrinkClass, orderClass, className)

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    )
  }
)
FlexItem.displayName = 'FlexItem'

function _getFlexClass(flex?: FlexValue): string {
  switch (flex) {
    case 1:
      return 'flex-1'
    case 'auto':
      return 'flex-auto'
    case 'initial':
      return 'flex-initial'
    case 'none':
      return 'flex-none'
    default:
      return ''
  }
}

function _getFlexGrowClass(grow?: 0 | 1): string {
  return grow === 0 ? 'grow-0' : grow === 1 ? 'grow-1' : ''
}

function _getFlexShrinkClass(shrink?: 0 | 1): string {
  return shrink === 0 ? 'shrink-0' : shrink === 1 ? 'shrink-1' : ''
}

function _getOrderClass(order?: OrderValue): string {
  if (typeof order === 'number') {
    return `order-${order}`
  }
  if (order === 'none' || order === 'first' || order === 'last') {
    return `order-${order}`
  }
  return ''
}

export default FlexItem
