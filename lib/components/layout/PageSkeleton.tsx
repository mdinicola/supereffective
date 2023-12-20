import React from 'react'

import { TemporaryAnnouncementBanners } from './announcements'
import styles from './PageSkeleton.module.css'
import MainFooter from './panels/MainFooter'
import MainHeader from './panels/MainHeader'

export default function PageSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={[
        'page',
        styles.page,
        `bdg-gr-teal-pattern`,
        ' main-site-bg',
        'dex-tracker-ui',
      ].join(' ')}
    >
      <MainHeader />
      <TemporaryAnnouncementBanners />
      <main className={['main', styles.main, ''].join(' ')}>{children}</main>
      <MainFooter />
    </div>
  )
}
