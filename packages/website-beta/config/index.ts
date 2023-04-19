import colorsConfig from './colors.json'
import { getBaseUrl } from './env'
import servicesConfig from './services'

const { primary, accent, ...colors } = colorsConfig

const config = {
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
    github_repos: 'https://github.com/itsjavi/supereffective-assets',
    github_dataset: 'https://github.com/itsjavi/supereffective-assets',
    discord: 'https://discord.gg/3fRXQFtrkN',
    issue_report: 'https://github.com/itsjavi/supereffective.gg/issues',
    paypal_donate: 'https://www.paypal.me/metaunicorn/10',
  },
  services: servicesConfig,
  theme: {
    colors: {
      primary: (colors as any)[primary],
      accent: (colors as any)[accent],
      ...colors,
    },
  },
}

export default config
