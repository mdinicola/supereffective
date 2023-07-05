'use client'

import { MenuIcon } from 'lucide-react'

import HeaderLogo from '@/components/skeleton/HeaderLogo'
import { css } from '@/styled-system/css'

export default function HeaderLeftMenu() {
  return (
    <div
      className={css({
        display: 'flex',
        flexShrink: 0,
        gap: 3,
        alignItems: 'center',
        fontSize: 'lg',
        letterSpacing: 'tighter',
        fontWeight: 'bold',
        textDecoration: 'none',
        WebkitTapHighlightColor: 'transparent',
      })}
    >
      <MenuIcon size={32} />
      <HeaderLogo />
    </div>
  )
}
