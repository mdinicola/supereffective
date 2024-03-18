import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'
import cls from './Popover.module.scss'

type PopoverProps = {
  id: string
  mode?: 'auto' | 'manual'
  native?: boolean
} & Omit<ComponentPropsWithoutRef<'div'>, 'popover'>

export default function Popover({ id, className, mode = 'auto', native, children, ...props }: PopoverProps) {
  if (native) {
    return (
      <div id={id} popover={mode} className={cn(cls.native, className)} {...props}>
        {children}
      </div>
    )
  }
  return (
    <div className={cn(cls.delegatedWrapper, className)} {...props}>
      <div id={id} className={cls.delegated} popover={mode} />
      {children}
    </div>
  )
}
