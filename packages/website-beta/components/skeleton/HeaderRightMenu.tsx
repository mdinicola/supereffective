'use client'

import { SearchIcon, UserCircle2Icon } from 'lucide-react'

import { css } from '@/styled-system/css'

export default function HeaderRightMenu() {
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
      <SearchIcon size={32} />
      <UserCircle2Icon size={32} />
    </div>
  )
}
