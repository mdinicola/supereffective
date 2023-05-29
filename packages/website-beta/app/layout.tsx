import './globals.css'

import React from 'react'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'

import { MDXRefreshMeta } from '@pkg/mdx/components/MDXRefreshMeta'
import { DarkModeScript } from '@pkg/ui/components/theme/DarkModeScript'

import config from '@/lib/config'

export const metadata = config.rootMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {config.baseUrl && <MDXRefreshMeta />}
        <DarkModeScript defaultEnabled={true} />
      </head>
      <body>
        {children}
        <VercelAnalytics />
      </body>
    </html>
  )
}
