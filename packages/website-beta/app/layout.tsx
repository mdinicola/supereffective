import BaseHead from '@/components/layouts/shared/BaseHead'

import './globals-legacy.css'
import './globals.css'

import { monaSans } from '@/app/_static/fonts'
import PrimaryLayout from '@/components/layouts/PrimaryLayout'
import config from '@/lib/config'

export const metadata = config.rootMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark${config.debugMode ? ' debug-mode' : ''}`}
      suppressHydrationWarning
    >
      <head>
        <BaseHead />
      </head>
      <body className={monaSans.className}>
        <PrimaryLayout>{children}</PrimaryLayout>
      </body>
    </html>
  )
}
