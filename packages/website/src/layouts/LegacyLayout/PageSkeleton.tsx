import React from 'react'

import MainFooter from './MainFooter'
import MainHeader from './MainHeader'
import styles from './PageSkeleton.module.css'

export default function PageSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <div className={['page', styles.page, `bdg-gr-teal-pattern`, ' main-site-bg'].join(' ')}>
      <MainHeader />
      <main className={['main', styles.main, ''].join(' ')}>{children}</main>
      <MainFooter />
    </div>
  )
}
