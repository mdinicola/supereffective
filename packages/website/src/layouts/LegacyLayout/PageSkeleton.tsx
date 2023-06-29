import React from 'react'

import AnnouncementBanner from '#/layouts/AnnouncementBanner'
import { ExternLink } from '#/primitives/legacy/Link/Links'

import MainFooter from './MainFooter'
import MainHeader from './MainHeader'
import styles from './PageSkeleton.module.css'

export default function PageSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <div className={['page', styles.page, `bdg-gr-teal-pattern`, ' main-site-bg'].join(' ')}>
      <MainHeader />
      {_renderAnnouncementBanners()}
      <main className={['main', styles.main, ''].join(' ')}>{children}</main>
      <MainFooter />
    </div>
  )
}

function _renderAnnouncementBanners() {
  return (
    <>
      <AnnouncementBanner startDate="2023-06-01" endDate="2023-06-29" dismissable>
        The SuperEffective project is now Open Source 🚀🎉!{' '}
        <ExternLink href="https://twitter.com/supereffectiv/status/1664207379292905472">
          Read the announcement →
        </ExternLink>
      </AnnouncementBanner>
    </>
  )
}
