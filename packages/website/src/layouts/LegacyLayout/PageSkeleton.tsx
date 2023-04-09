import React from 'react'

import { DefaultBackgroundTheme } from '#/hooks/legacy/useBackgroundTheme'

import MainFooter from './MainFooter'
import MainHeader from './MainHeader'
import styles from './PageSkeleton.module.css'

export default function PageSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={['page', styles.page, `bdg-gr-${DefaultBackgroundTheme}`, ' main-site-bg'].join(
        ' '
      )}
    >
      <MainHeader />
      <main className={['main', styles.main, ''].join(' ')}>{children}</main>
      <MainFooter />
    </div>
  )
}
