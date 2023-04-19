import React, { forwardRef } from 'react'

import { cn, createClassNameFactory } from '../../../lib/classNames'

const makeCn = createClassNameFactory('Cover')

export interface CoverProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Cover = forwardRef<HTMLDivElement, CoverProps>((props, ref) => {
  const { children, className, ...other } = props

  return (
    <div ref={ref} className={cn(makeCn('root'), 'flex w-full', className)} {...other}>
      {children}
    </div>
  )
})

Cover.displayName = 'Cover'

export default Cover
