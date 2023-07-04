import { DivAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { css } from '@/styled-system/css'

type MainHeaderProps = DivAttributes<{
  children: React.ReactNode
}>

export default function MainHeader({ children, className, ...rest }: MainHeaderProps) {
  return (
    <header
      {...rest}
      className={cn(
        css({
          display: 'flex',
          p: 4,
        }),
        className
      )}
    >
      {children}
    </header>
  )
}
