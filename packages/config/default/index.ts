import { getBaseUrl, isDevelopmentEnv } from './env'
import servicesConfig from './services'

const config = {
  dev: isDevelopmentEnv(),
  baseUrl: getBaseUrl(),
  version: {
    num: '4.0.0',
  },
  texts: {
    siteName: 'SuperEffective',
    standaloneTitle: 'SuperEffective',
    defaultMetaTitle: 'SuperEffective - Your Pokémon Gaming Companion',
    defaultMetaDescription:
      'Supereffective is a new Pokémon website with news and various tools to assist you ' +
      'in your journey as a trainer. Follow us to stay up-to-date.',
  },
  links: {
    twitter: 'https://twitter.com/supereffectiv',
    github: 'https://github.com/itsjavi',
    github_dataset: 'https://github.com/itsjavi/supereffective-assets',
    issue_report: 'https://github.com/itsjavi/supereffective-issues/issues',
    roadmap: 'https://github.com/users/itsjavi/projects/9',
    discord: 'https://discord.gg/3fRXQFtrkN',
    paypal_donate: 'https://www.paypal.me/metaunicorn/10',
  },
  services: servicesConfig,
}

export default config
