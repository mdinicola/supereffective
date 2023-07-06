import { DivAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { fluentlayout } from '@/styled-system/patterns'

type MainLayoutProps = DivAttributes<{
  children: React.ReactNode
}>

export default function MainLayout({ children, className, ...rest }: MainLayoutProps) {
  return (
    <div
      {...rest}
      className={cn(
        fluentlayout({
          gap: 3,
          px: 3,
          pt: 3,
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
