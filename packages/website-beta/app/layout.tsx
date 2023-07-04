import { MDXRefreshMeta } from '@pkg/mdx/components/MDXRefreshMeta'

import './globals.css'

import { isDevelopmentEnv } from '@pkg/utils/lib/env'

import { monaSans } from '@/app/fonts'
import { DarkModeScript } from '@/components/skeleton/DarkModeScript'
import MainContent from '@/components/skeleton/MainContent'
import MainFooter from '@/components/skeleton/MainFooter'
import MainHeader from '@/components/skeleton/MainHeader'
import MainLayout from '@/components/skeleton/MainLayout'
import config from '@/lib/config'

export const metadata = config.rootMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={'dark'}>
      <head>
        {isDevelopmentEnv() && (
          // Forces a page refresh when a new MDX file is changed
          <MDXRefreshMeta />
        )}
        <DarkModeScript defaultEnabled={true} />
      </head>
      <body className={monaSans.className}>
        <MainLayout>
          <MainHeader>Header</MainHeader>
          <MainContent>{children}</MainContent>
          <MainFooter>Footer</MainFooter>
        </MainLayout>
      </body>
    </html>
  )
}
