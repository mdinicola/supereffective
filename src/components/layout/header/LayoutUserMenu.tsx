import Popover from '@/components/primitives/Popover'
import { cn } from '@/lib/utils'
import { CircleUserRoundIcon } from 'lucide-react'
import type { ComponentPropsWithoutRef } from 'react'
import cls from './LayoutUserMenu.module.scss'

export default function LayoutUserMenu(props: LayoutUserMenuProps) {
  const popoverId = 'user-menu-popover'
  return (
    <>
      <div className={cls.trigger} {...props}>
        <button popovertarget={popoverId} type="button" title="User Menu">
          <CircleUserRoundIcon width={24} height={24} />
        </button>
      </div>
      <Popover id={popoverId} role="menu" className={cn(cls.menu, 'with-chevron')} mode="manual">
        <div>Premium: 3/25 dexes.</div>
        <ul>
          <li>
            <a href="/v4/account">Account</a>
          </li>
          <li>
            <a href="/v4/settings">Settings</a>
          </li>
          <li>
            <a href="/v4/logout">Logout</a>
          </li>
        </ul>
      </Popover>
    </>
  )
}

type LayoutUserMenuProps = {} & Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className'>
