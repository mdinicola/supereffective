import type { ComponentPropsWithoutRef } from 'react'
import cls from './LayoutBody.module.scss'

type LayoutBodyProps = {} & Omit<ComponentPropsWithoutRef<'main'>, 'className'>

export default function LayoutBody({ children, ...props }: LayoutBodyProps) {
  return (
    <main className={cls.baset} {...props}>
      {children}
    </main>
  )
}
