import { DivAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { menuBarRecipe } from '@/styled-system-config/recipes/menuBarRecipe'

type MainFooterProps = DivAttributes<{
  children: React.ReactNode
}>

export default function MainFooter({ children, className, ...rest }: MainFooterProps) {
  return (
    <footer
      {...rest}
      className={cn(menuBarRecipe({ theme: 'dark', radius: 'top' }), 'main-footer', className)}
    >
      {children}
    </footer>
  )
}
