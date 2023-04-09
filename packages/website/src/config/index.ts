import { getBaseUrl } from '#/config/env'

import servicesConfig from './services'
import themeConfig from './theme'

const config = {
  baseUrl: getBaseUrl(),
  version: {
    num: '3.5.0',
  },
  texts: {
    siteName: 'SuperEffective',
    standaloneTitle: 'SuperEffective',
    defaultMetaTitle: 'Supereffective - Latest Pokémon news & Scarlet/Violet rumors',
    defaultMetaDescription:
      'Supereffective is a new Pokémon website with news and various tools to assist you ' +
      'in your journey as a trainer. Follow us to stay up-to-date.',
  },
  links: {
    twitter: 'https://twitter.com/supereffectiv',
    github: 'https://github.com/itsjavi',
    github_repos: 'https://github.com/itsjavi/supereffective-assets',
    github_dataset: 'https://github.com/itsjavi/supereffective-assets',
    discord: 'https://discord.gg/3fRXQFtrkN',
    issue_report: 'https://github.com/itsjavi/supereffective.gg/issues',
    paypal_donate: 'https://www.paypal.me/metaunicorn/10',
    feedback_gdoc:
      'https://docs.google.com/forms/d/e/1FAIpQLSfcLi7V5YalUsBrd_whLAy4cHMCZX2kDGUP8kJFhnrVGyrOQQ/viewform',
  },
  services: servicesConfig,
  theme: themeConfig,
}

export default config
