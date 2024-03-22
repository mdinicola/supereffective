import LogoIcon from '@/assets/images/logo-text3.svg'
import type { ComponentPropsWithoutRef } from 'react'

import DiscordIcon from '@/assets/images/discord-icon.svg'
import GithubIcon from '@/assets/images/github-icon.svg'
import PatreonIcon from '@/assets/images/patreon-icon.svg'
import TwitterIcon from '@/assets/images/x-twitter-icon.svg'
import Link from 'next/link'

import appConfig from '@/config/app'
import cls from './LayoutFooter.module.scss'

type LayoutFooterProps = {} & Omit<ComponentPropsWithoutRef<'footer'>, 'children' | 'className'>

export default function LayoutFooter(props: LayoutFooterProps) {
  const currentYear = new Date().getFullYear()
  const links = appConfig.links

  return (
    <footer className={cls.base} {...props}>
      <nav className={cls.nav}>
        <div className={cls.logosNav}>
          <div>
            <Link href="/v4/" title="Homepage" className={cls.logo}>
              <LogoIcon data-filled width={200} height={100} className={cls.logoImg} />
            </Link>
          </div>
          <div className={cls.socials}>
            <a title="Discord" href={links.discord} target="_blank" rel="noreferrer">
              <DiscordIcon data-filled width={18} height={18} />
            </a>
            <a title="Twitter / X" href={links.twitter} target="_blank" rel="noreferrer">
              <TwitterIcon data-filled width={18} height={18} />
            </a>
            <a title="Github" href={links.github_org} target="_blank" rel="noreferrer">
              <GithubIcon data-filled width={18} height={18} />
            </a>
            <a title="Patreon" href={links.patreon} target="_blank" rel="noreferrer">
              <PatreonIcon data-filled width={18} height={18} />
            </a>
          </div>
        </div>
        <div>
          <h2 className={cls.h2}>Features</h2>
          <ul className={cls.ul}>
            <li>
              <a href="/v4/pokemon">National Pokédex</a>
            </li>
            <li>
              <a href="/v4/dex-tracker">LivingDex Tracker</a>
            </li>
            <li className={cls.wipText}>Shiny Hunt Challenge (WIP)</li>
            <li className={cls.wipText}>GTS & Trade Box (WIP)</li>
            <li className={cls.wipText}>Team Builder (WIP)</li>
          </ul>
        </div>
        <div>
          <h2 className={cls.h2}>Development</h2>
          <ul className={cls.ul}>
            <li>
              <Link href="/v4/changelog">Changelog</Link>
            </li>
            <li>
              <a href={links.github_repo} target="_blank" rel="noreferrer">
                Source Code
              </a>
            </li>
            <li>
              <a href={links.github_board} target="_blank" rel="noreferrer">
                Backlog & Roadmap
              </a>
            </li>
            <li>
              <a href={links.github_issues} target="_blank" rel="noreferrer">
                Report an Issue
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className={cls.h2}>About</h2>
          <ul className={cls.ul}>
            <li>
              <Link href="/v4/donations">Donating</Link>
            </li>
            <li>
              <Link href="/v4/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/v4/about">About Us</Link>
            </li>
            <li>
              <Link href="/v4/about">Discord Server</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className={cls.h2}>Legal</h2>
          <ul className={cls.ul}>
            <li>
              <Link href="/v4/terms-of-service">Terms of Service</Link>
            </li>
            <li>
              <Link href="/v4/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/v4/disclaimer">Legal Disclaimer</Link>
            </li>
            <li>
              <Link href="/v4/license">License</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className={cls.disclaimer}>
        &copy; SuperEffective.gg 2021-{currentYear}. This fan site is not associated in any way with Pokémon or The
        Pokémon Company International, or Nintendo.{' '}
        {/* Pokémon and All Respective Names are Trademark & &copy; of Nintendo 1996-{currentYear} */}
        <Link href="/v4/disclaimer">[more]</Link>
      </div>
    </footer>
  )
}
