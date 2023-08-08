import Link from 'next/link'
import { HeartIcon } from 'lucide-react'

import DiscordIcon from '@/assets/brands/social/discord.svg'
import GithubIcon from '@/assets/brands/social/github.svg'
import TwitterIcon from '@/assets/brands/social/twitter.svg'
import LogoIcon from '@/assets/logo/logo.svg'
import Button from '@/components/primitives/Button'
import config from '@/lib/config'
import { DivAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'

import { RefreshButton } from './RefreshButton'
import Sidebar, { flexIconsClass, sidebarBodyClass } from './Sidebar'

type GeneralSidebarProps = DivAttributes<{
  children: React.ReactElement
}>

function SidebarBody() {
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
          <RefreshButton />
          <Button
            href="/"
            hardLink
            title="SuperEffective.gg"
            color="transparent"
            className={css({
              display: 'block!',
              textAlign: 'center',
              '& > img': {
                display: 'inline-block',
              },
            })}
          >
            <LogoIcon width={48} height={48} />
          </Button>
          <Button title="Support Us" href="/donations" color="transparent">
            <HeartIcon
              size={24}
              className={cn(
                css({
                  color: 'pink.400',
                  _hover: {
                    color: 'pink.500',
                  },
                }),
                'filled'
              )}
            />
          </Button>
        </div>
        <h1
          className={css({
            fontSize: 'lg',
            fontWeight: 'bolder',
            letterSpacing: 'tighter',
            textAlign: 'center',
            color: 'gray.400',
            textShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
          })}
        >
          SuperEffective.gg
        </h1>
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
          <Link href="/pokedex">PokéDex</Link>
          <Link href="/livingdex">LivingDex</Link>
          <hr />
          <a href={config.links.roadmap} target="_blank" rel="norefer nofollow">
            Roadmap
          </a>
          <Link href="/faq">FAQ</Link>
          <Link href="/about">About Us</Link>
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
        <div className={flexIconsClass}>
          <Button href={config.links.twitter} color="transparent" title="Twitter">
            <TwitterIcon width={24} height={24} />
          </Button>
          <Button href={config.links.discord} color="transparent" title="Discord">
            <DiscordIcon width={24} height={24} />
          </Button>
          <Button href={config.links.github_site} color="transparent" title="Github">
            <GithubIcon width={24} height={24} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function GeneralSidebar({ children: trigger, ...rest }: GeneralSidebarProps) {
  return (
    <Sidebar {...rest}>
      {trigger}
      <SidebarBody />
    </Sidebar>
  )
}
