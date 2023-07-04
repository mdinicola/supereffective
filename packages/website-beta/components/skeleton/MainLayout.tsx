import { DivAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { css } from '@/styled-system/css'

type MainLayoutProps = DivAttributes<{
  children: React.ReactNode
}>

export default function MainLayout({ children, className, ...rest }: MainLayoutProps) {
  return (
    <div
      {...rest}
      className={cn(
        css({
          display: 'flex',
          flexDirection: 'column',
          minH: '100dvh',
        }),
        className
      )}
    >
      {children}
    </div>
  )
}
