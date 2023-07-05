import { MDXRefreshMeta } from '@pkg/mdx/components/MDXRefreshMeta'

import './globals.css'

import { isDevelopmentEnv } from '@pkg/utils/lib/env'

import { monaSans } from '@/app/fonts'
import DarkModeScript from '@/components/preflight/DarkModeScript'
import StandaloneModeScript from '@/components/preflight/StandaloneModeScript'
import config from '@/lib/config'

export const metadata = config.rootMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={'dark standalone-aware'} suppressHydrationWarning>
      <head>
        {isDevelopmentEnv() && (
          // Forces a page refresh when a new MDX file is changed
          <MDXRefreshMeta />
        )}
        <DarkModeScript defaultEnabled={true} />
      </head>
      <body className={monaSans.className}>
        {children}
        <StandaloneModeScript />
      </body>
    </html>
  )
}
