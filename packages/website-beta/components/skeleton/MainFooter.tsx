import { DivAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { css } from '@/styled-system/css'

type MainFooterProps = DivAttributes<{
  children: React.ReactNode
}>

export default function MainFooter({ children, className, ...rest }: MainFooterProps) {
  return (
    <footer
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
    </footer>
  )
}
