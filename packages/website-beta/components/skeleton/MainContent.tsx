import { DivAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { vscrollable } from '@/styled-system/patterns'

type MainContentProps = DivAttributes<{
  children: React.ReactNode
}>

export default function MainContent({ children, className, ...rest }: MainContentProps) {
  return (
    <main
      {...rest}
      className={cn(
        vscrollable({
          flex: '1',
          color: 'gray.100',
          bgColor: 'gray.800',
          // minH: '400px',
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
