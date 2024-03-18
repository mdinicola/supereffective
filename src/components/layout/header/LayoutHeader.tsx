import type { ComponentPropsWithoutRef } from 'react'
import cls from './LayoutHeader.module.scss'
import LayoutMenu from './LayoutMenu'

export default function LayoutHeader(props: LayoutHeaderProps) {
  return (
    <header className={cls.base} {...props}>
      <LayoutMenu />
    </header>
  )
}

type LayoutHeaderProps = {} & Omit<ComponentPropsWithoutRef<'header'>, 'children' | 'className'>
