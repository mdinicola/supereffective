'use client'

import Image from 'next/image'
import Link from 'next/link'

import { css } from '@/styled-system/css'

import logo from '../../assets/logo/logo.svg'

export default function HeaderLogo({ withText }: { withText?: boolean }) {
  return (
    <Link
      href="/"
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        color: 'inherit',
        textDecoration: 'none',
        WebkitTapHighlightColor: 'transparent',
      })}
      onClick={e => {
        setTimeout(() => {
          window.scrollTo(0, 0)
          window.location.reload()
        }, 500)
      }}
    >
      <Image src={logo} alt="logo" width={32} height={32} />
    </Link>
  )
}
