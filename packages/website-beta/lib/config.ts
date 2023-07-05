import { Metadata } from 'next'

import _config from '@pkg/config/default'

import { token } from '@/styled-system/tokens'

const rootMetadata: Metadata = {
  title: {
    template: '%s | ' + _config.texts.siteName,
    absolute: _config.texts.defaultMetaTitle,
    default: _config.texts.siteName,
  },
  description: _config.texts.defaultMetaDescription,
  applicationName: _config.texts.standaloneTitle,
  appleWebApp: {
    title: _config.texts.standaloneTitle,
    statusBarStyle: 'black-translucent',
    capable: true,
  },
  themeColor: token('colors.amber.800'),
  viewport: 'width=device-width, initial-scale=1',
}

const config = {
  ..._config,
  rootMetadata,
}

export default config
