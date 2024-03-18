import '@/styles/all.scss'

import LayoutScripts from '@/components/layout/LayoutScripts'
import LayoutFooter from '@/components/layout/footer/LayoutFooter'
import LayoutHeader from '@/components/layout/header/LayoutHeader'
import LayoutBody from '@/components/layout/main/LayoutBody'
import { metadataConfig, viewportConfig } from '@/config/metadata'
import { isProductionEnv } from '@/lib/env'
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import cls from './layout.module.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata = metadataConfig
export const viewport = viewportConfig

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isV4Enabled = process.env.APP_V4_ENABLED === '1' || !isProductionEnv()
  if (!isV4Enabled) {
    return (
      <html lang="en" className="dark">
        <body className={inter.className}>
          <p>SuperEffective 4.0 is Under Construction. Please come back before Summer 2024.</p>
        </body>
      </html>
    )
  }
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className={cn('root-layout', cls.base)}>
          <LayoutHeader />
          <LayoutBody>{children}</LayoutBody>
          <LayoutFooter />
        </div>
        <LayoutScripts />
      </body>
    </html>
  )
}
