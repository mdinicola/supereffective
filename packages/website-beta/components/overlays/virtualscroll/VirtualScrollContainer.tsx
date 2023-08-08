'use client'

import { forwardRef } from 'react'

import { ExtendedHTMLProps } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { css } from '@/styled-system/css'

export type VirtualScrollContainerProps = Omit<
  ExtendedHTMLProps<
    HTMLDivElement,
    {
      total: number
      totalHeight: number
      startOffset: number
      classNames?: [string] | [string, string] | [string, string | undefined, string]
      children: Array<
        React.ReactElement<{
          ref: React.RefObject<any>
          key: string
          ['data-index']: number
        }>
      >
    }
  >,
  'className'
>

function VirtualScrollContainer(
  { total, totalHeight, startOffset, children, classNames, ...rest }: VirtualScrollContainerProps,
  ref: React.Ref<HTMLDivElement>
) {
  const [className, className2, className3] = classNames || []

  return (
    <div ref={ref} className={className} {...rest}>
      <div
        className={className2}
        style={{
          height: totalHeight,
        }}
      >
        <div
          className={cn(
            css({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              // transition: 'transform 0.2s ease-in-out',
            }),
            className3
          )}
          style={{
            transform: `translateY(${startOffset}px)`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

const ForwardsVirtualScrollContainer = forwardRef<HTMLDivElement, VirtualScrollContainerProps>(
  VirtualScrollContainer
)
ForwardsVirtualScrollContainer.displayName = 'VirtualScrollContainer'

export default ForwardsVirtualScrollContainer
