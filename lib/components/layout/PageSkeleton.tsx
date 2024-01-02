import React from 'react'

import { useRefreshOnVersionChange } from '@/lib/hooks/useBuildVersion'

import { TemporaryAnnouncementBanners } from '../panels/announcements'
import MainFooter from '../panels/MainFooter'
import MainHeader from '../panels/MainHeader'
import styles from './PageSkeleton.module.css'

export default function PageSkeleton({ children }: { children: React.ReactNode }) {
  useRefreshOnVersionChange()

  return (
    <div
      className={[
        'page',
        styles.page,
        `bdg-gr-teal-pattern`,
        ' bg-blueberry-gradient-static',
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
