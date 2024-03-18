import { DicesIcon, MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

import LogoIcon from '@/assets/images/logo.svg'
import NavLink from '@/components/primitives/NavLink'
import Popover from '@/components/primitives/Popover'
import cls from './LayoutMenu.module.scss'
import LayoutUserMenu from './LayoutUserMenu'

export default function LayoutMenu(props: LayoutMenuProps) {
  const popoverId = 'nav-popover'
  const mainMenuLinks = (
    <>
      <NavLink href="/v4/pokemon">Pokémon</NavLink>
      <NavLink href="/v4/dexes">Dex Tracker</NavLink>
      <NavLink href="/v4/teams" hidden>
        Team Builder
      </NavLink>
      <NavLink href="/v4/contact">
        <DicesIcon width={24} height={24} />
        Challenge
      </NavLink>
      <NavLink href="/v4/about">About</NavLink>
    </>
  )

  const desktopMainMenu = (
    <nav className={cls.desktopMainMenu} aria-label="Main menu">
      {mainMenuLinks}
    </nav>
  )

  const mobileMainMenu = (
    <Popover id={popoverId} className={cls.mobileMainMenu} mode="auto">
      <nav className={cls.mobileMainMenuInner} role="dialog" aria-label="Main Menu">
        {mainMenuLinks}
        <button
          type="button"
          title="Close menu"
          className={cls.mobileMainMenuCloseBtn}
          popovertarget={popoverId}
          popovertargetaction="hide"
        >
          <XIcon width={24} height={24} />
        </button>
      </nav>
    </Popover>
  )

  const menuToggleBtn = (
    <button
      type="button"
      aria-label="Toggle Menu"
      popovertarget={popoverId}
      className={cls.menuToggleBtn}
      popovertargetaction="show"
    >
      <MenuIcon width={24} height={24} />
    </button>
  )

  const homeBtn = (
    <Link href="/v4" title="Homepage" className={cls.homeBtn}>
      <LogoIcon width={40} height={40} />
    </Link>
  )

  return (
    <div className={cls.base} {...props}>
      <div className={cls.zone}>
        {menuToggleBtn}
        {mobileMainMenu}
        {homeBtn}
        {desktopMainMenu}
      </div>
      <div className={cls.zone}>
        <LayoutUserMenu />
      </div>
    </div>
  )
}

type LayoutMenuProps = {} & Omit<ComponentPropsWithoutRef<'nav'>, 'children' | 'className'>
