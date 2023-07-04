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
          bg: 'gray.900',
          p: 4,
        }),
        className
      )}
    >
      {children}
    </main>
  )
}
