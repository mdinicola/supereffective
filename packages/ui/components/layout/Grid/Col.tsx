import React, { ForwardedRef, forwardRef } from 'react'

import { cn, createClassNameFactory } from '../../../lib/classNames'
import { colSpan, colSpanLg, colSpanMd, colSpanSm, GridClassesMapping } from './styles'

const makeCn = createClassNameFactory('Col')

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpans?: number
  colSpansSm?: number
  colSpansMd?: number
  colSpansLg?: number
}

const Col = forwardRef((props: ColProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { colSpans = 1, colSpansSm, colSpansMd, colSpansLg, children, className, ...other } = props

  const getColSpan = (
    numColSpan: number | undefined,
    colSpanMapping: GridClassesMapping
  ): string => {
    if (!numColSpan) return ''
    if (!Object.keys(colSpanMapping).includes(String(numColSpan))) return ''
    return colSpanMapping[numColSpan]
  }

  const getColSpanClassNames = () => {
    const spanBase = getColSpan(colSpans, colSpan)
    const spanSm = getColSpan(colSpansSm, colSpanSm)
    const spanMd = getColSpan(colSpansMd, colSpanMd)
    const spanLg = getColSpan(colSpansLg, colSpanLg)

    return cn(spanBase, spanSm, spanMd, spanLg)
  }

  return (
    <div ref={ref} className={cn(makeCn('root'), getColSpanClassNames(), className)} {...other}>
      {children}
    </div>
  )
})

Col.displayName = 'Col'

export default Col
