import { Metadata } from 'next'

import config from '@pkg/config/default'
import colors from '@pkg/ui/theme/colors'

const rootMetadata: Metadata = {
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
  themeColor: colors.standalone,
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

const appConfig = {
  ...config,
  theme: {
    colors,
  },
  rootMetadata,
}

export default appConfig
