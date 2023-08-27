import Link from 'next/link'

import Button from '@/components/primitives/Button'
import { DivAttributes } from '@/lib/types/react'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import { EditIcon, ImageIcon, Settings2Icon } from 'lucide-react'

import Sidebar, { flexIconsClass, sidebarBodyClass } from './Sidebar'

type UserSidebarProps = DivAttributes<{
  children: React.ReactElement
}>

function SidebarBody({ close }: { close?: () => void }) {
  return (
    <div className={sidebarBodyClass}>
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          gap: 3,
        })}
      >
        <div className={flexIconsClass}>
          <Button title="Edit profile" color="transparent" href="/my/profile">
            <EditIcon size={24} />
          </Button>
          <Button
            title="View profile"
            color="transparent"
            className={css({
              display: 'block!',
              textAlign: 'center',
              '& > img': {
                display: 'inline-block',
              },
            })}
            href="/my/profile"
          >
            <ImageIcon size={48} />
          </Button>
          <Button title="Settings" href="/my/settings" color="transparent">
            <Settings2Icon size={24} />
          </Button>
        </div>
        <div
          className={css({
            fontSize: 'xl',
            fontWeight: 'bolder',
            letterSpacing: 'tighter',
            textAlign: 'center',
            color: 'gray.400',
            textShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
          })}
        >
          @username
        </div>
        <nav
          className={flex({
            // display: 'none',
            gap: 5,
            direction: 'column',
            justifyContent: 'center',
            _standalone: {
              display: 'flex',
            },
            p: 4,
            '& a': {
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
              fontSize: 'xl',
              fontWeight: 'semibold',
              fontStretch: 'semi-expanded',
              letterSpacing: 'tight',
              _hover: {
                color: 'gold.500',
              },
            },
          })}
        >
          <hr />
          <Link href="#">Login</Link>
          <hr />
          <Link href="/my/dashboard">Dashboard</Link>
          <Link href="/u/the_username">Profile</Link>
          <Link href="#">Language</Link>
          <Link href="#">Support</Link>
          <Link href="/ui">Dev/UI</Link>
          <hr />
          <Link href="#">Logout</Link>
        </nav>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          gap: 3,
        })}
      >
        <hr />

        <div
          className={flex({
            display: 'flex',
            gap: 2,
            px: 2,
            justifyContent: 'space-evenly',
            fontSize: '0.7rem',
          })}
        >
          <Button href={'#'} color="transparent">
            ENG
          </Button>
          <Button href={'#'} color="transparent">
            ESP
          </Button>
          <Button href={'#'} color="transparent">
            ITA
          </Button>
          <Button href={'#'} color="transparent">
            DEU
          </Button>
          <Button href={'#'} color="transparent">
            FRA
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function UserSidebar({ children: trigger, ...rest }: UserSidebarProps) {
  return (
    <Sidebar {...rest} placement="right">
      {trigger}
      <SidebarBody />
    </Sidebar>
  )
}
