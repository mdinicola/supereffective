import { DivAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { css } from '@/styled-system/css'
import { Center } from '@/styled-system/jsx'

export default function FullCenter({ children, className, ...rest }: DivAttributes<{ ref?: any }>) {
  return (
    <Center className={cn(css({ p: 3, h: 'full' }), className)} {...rest}>
      <div>{children}</div>
    </Center>
  )
}
