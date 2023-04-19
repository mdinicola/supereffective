import './globals.css'

import React from 'react'

import mdxRefresh from '@pkg/mdx/lib/next-plugin/withMDXPageRefresh.meta'

import config from '@/config'
import { isDevelopmentEnv } from '@/config/env'

const themeColor = config.theme.colors.accent[900]

export const metadata = {
  title: {
    template: '%s | ' + config.texts.siteName,
    absolute: config.texts.defaultMetaTitle,
    default: config.texts.siteName,
  },
  description: config.texts.defaultMetaDescription,
  applicationName: config.texts.standaloneTitle,
  appleWebApp: {
    title: config.texts.standaloneTitle,
    statusBarStyle: 'black-translucent',
    capable: true,
  },
  themeColor: themeColor,
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

const DarkModeScript = () => {
  const code = `
(function() {
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const darkModeOn = darkModeMediaQuery.matches;
  const darkModeStorage = localStorage.getItem('darkMode');
  const darkMode = darkModeStorage ? darkModeStorage === 'true' : darkModeOn;
  document.documentElement.classList.toggle('dark', darkMode);
})();
`
  return <script id="set-darkmode" defer dangerouslySetInnerHTML={{ __html: code }} />
}

const MDXRefreshMeta = () => {
  if (!isDevelopmentEnv()) return null

  // Forces a page refresh when a new MDX file is changed
  return <meta name="x-mdx-refresh-timestamp" content={mdxRefresh.timestamp} />
}

const initialTheme = 'dark'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={initialTheme} suppressHydrationWarning>
      <head>
        <MDXRefreshMeta />
        <DarkModeScript />
      </head>
      <body>{children}</body>
    </html>
  )
}
