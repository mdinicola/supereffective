import { DivAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { css } from '@/styled-system/css'

type MainContentProps = DivAttributes<{
  children: React.ReactNode
}>

export default function MainContent({ children, className, ...rest }: MainContentProps) {
  return (
    <main
      {...rest}
      className={cn(
        css({
          flex: '1',
          overflowY: 'auto',
          color: 'gray.100',
          bgColor: 'gray.800',
          minH: '400px',
          p: 4,
          borderRadius: 'xl',
        }),
        'main-content',
        className
      )}
    >
      {children}
    </main>
  )
}
