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
          justifyContent: 'space-between',
          h: '100dvh',
          minW: '300px',
          gap: 3,
          px: 3,
          pt: 3,
          maxH: '100dvh',
          bgColor: 'gray.900',
        }),
        'main-layout',
        className
      )}
    >
      {children}
    </div>
  )
}
