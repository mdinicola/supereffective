import { Inter } from 'next/font/google'

import { MDXRefreshMeta } from '@pkg/mdx/components/MDXRefreshMeta'

import './globals.css'

import { isDevelopmentEnv } from '@pkg/utils/lib/env'

import { DarkModeScript } from '@/components/skeleton/DarkModeScript'
import config from '@/lib/config'

const inter = Inter({ subsets: ['latin'] })

export const metadata = config.rootMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        {isDevelopmentEnv() && (
          // Forces a page refresh when a new MDX file is changed
          <MDXRefreshMeta />
        )}
        <DarkModeScript defaultEnabled={true} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
