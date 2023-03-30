import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import config from '@app/src/config/legacy'
import UserMenu from '@app/src/layouts/LegacyLayout/UserMenu'

import { ExternLink, SiteLink } from '../../primitives/legacy/Link/Links'
import styles from './MainHeader.module.css'

export default function MainHeader() {
  const router = useRouter()
  const pageSrc = router.query.s

  const [navbarOpen, setNavbarOpen] = useState(false)

  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  }

  return (
    <>
      <div className={styles.header + (navbarOpen ? ' ' + styles.open : '')}>
        <div className={styles.headerTop}>
          <Link href="/" className={styles.headerLogo} tabIndex={0}>
            <Image src="/assets/logo/logo.png" width="64" height="64" alt="logo" />
            <h1>
              {config.siteName}
              <small>.gg</small>
            </h1>
          </Link>

          <nav tabIndex={0} className={styles.menu + (navbarOpen ? ' ' + styles.open : '')}>
            <SiteLink activeClass={styles.active} href="/" tabIndex={1}>
              Home
            </SiteLink>
            <SiteLink activeClass={styles.active} href="/news" tabIndex={1}>
              News
            </SiteLink>
            <SiteLink activeClass={styles.active} tabIndex={1} href="/apps/pokedex">
              <i className={'icon-pkg-pokedex-rotom margin-r icon--2x'} />
              Pokédex
            </SiteLink>
            <SiteLink activeClass={styles.active} tabIndex={2} href="/apps/livingdex">
              <i className={'icon-pkg-box-home margin-r icon--2x'} /> Dex Tracker
            </SiteLink>
            <ExternLink href={config.social.twitter} tabIndex={3} title={'Twitter'}>
              <i
                style={{ color: '#56c2e3', fontSize: '1.4rem' }}
                className={'icon-brand-twitter'}
              />
              <span className="mobile-only" style={{ fontSize: 'inherit', color: '#fff' }}>
                Twitter
              </span>
            </ExternLink>
            <ExternLink href={config.social.discord} tabIndex={4} title={'Discord'}>
              <i
                style={{ color: '#5667E3', fontSize: '1.4rem' }}
                className={'icon-brand-discord'}
              />
              <span className="mobile-only" style={{ fontSize: 'inherit', color: '#fff' }}>
                Discord
              </span>
            </ExternLink>
            <SiteLink href="/donate" tabIndex={5} title={'Donate to help this site'}>
              <i className="icon-pkg-mark-heart" title="Donate" style={{ color: '#f0dd73' }} />
              <span className={'mobile-onlys'}>Support Us</span>
            </SiteLink>
            {/* <ExternLink
              href="https://docs.google.com/forms/d/e/1FAIpQLSfcLi7V5YalUsBrd_whLAy4cHMCZX2kDGUP8kJFhnrVGyrOQQ/viewform"
              tabIndex={5}
              title={"Send Feedback"}
            >
              <i className="icon-add_comment" style={{ color: "#f09f73" }} />
              <span className={"mobile-only"}>Send Feedback</span>
            </ExternLink> */}
            <UserMenu
              loginLink={
                <SiteLink
                  activeClass={styles.active}
                  href={'/login' + (pageSrc ? '?s=' + pageSrc : '')}
                  tabIndex={6}
                >
                  Sign In
                </SiteLink>
              }
            />
          </nav>

          <span
            className={styles.menuToggle}
            onClick={handleToggle}
            role="button"
            title="Menu"
            tabIndex={6}
          >
            <Image src={'/assets/gui/menu-dots.png'} alt="..." fill={true} />
          </span>
        </div>
      </div>
      {navbarOpen && (
        <div
          className={styles.navbarOpenOverlay}
          onClick={() => {
            setNavbarOpen(false)
          }}
        />
      )}
    </>
  )
}
