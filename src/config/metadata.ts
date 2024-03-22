import { getBaseUrl } from '@/lib/urls'
import { cssVarsConfig } from '@/styles/variables.config'
import type { Metadata, Viewport } from 'next'
import appConfig from './app'

/**
 * Default site metadata
 */
export const metadataConfig: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  // @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#template-object
  title: {
    // absolute: metaTitle, // ignores parent segments
    template: `%s - ${appConfig.siteName}`,
    default: appConfig.text.mainWindowTitle,
  },
  description: appConfig.text.mainMetaDescription,
  icons: [
    {
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
    },
  ],
  applicationName: appConfig.text.pwaName,
  appleWebApp: {
    title: appConfig.text.pwaTitle,
    capable: true,
  },
}

export const viewportConfig: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
  themeColor: cssVarsConfig.colors.primary.pwaTheme,
}
