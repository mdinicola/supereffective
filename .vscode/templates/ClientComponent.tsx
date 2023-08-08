'use client'

import { cn } from '@/lib/utils/cn'
import { css } from '@/styled-system/css'
import { DivAttributes } from '@/lib/types/react'

type MyComponentProps = DivAttributes<{
  //
}>

export default function MyComponent({
  className,
  children,
  ...rest
}: MyComponentProps) {
  return (
    <div className={cn(css({}), className)} {...rest}>
      {children}
    </div>
  )
}
