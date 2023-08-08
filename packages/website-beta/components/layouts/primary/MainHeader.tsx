import { DivAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { menuBarRecipe, menuBarTitleRecipe } from '@/styled-system-config/recipes/menuBarRecipe'
import { css } from '@/styled-system/css'

import HeaderLeftMenu from './HeaderLeftMenu'
import HeaderRightMenu from './HeaderRightMenu'

type MainHeaderProps = DivAttributes<{
  menuTitle?: React.ReactNode
  children?: never
}>

export default function MainHeader({ className, menuTitle, ...rest }: MainHeaderProps) {
  const defaultTitle = (
    <>
      SuperEffective<small>.gg</small>
    </>
  )
  return (
    <header className={css({ display: 'flex', flexDir: 'column', gap: 3 })} {...rest}>
      <div className={cn(menuBarRecipe(), 'main-header', className)}>
        <HeaderLeftMenu />
        <h1 className={menuBarTitleRecipe()}>{menuTitle ? menuTitle : defaultTitle}</h1>
        <HeaderRightMenu />
      </div>
    </header>
  )
}
