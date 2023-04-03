import { getEnvName } from '@app/src/config/env'
import servicesConfig from './services'

const envName = getEnvName()

const baseUrls: Record<string, string> = {
  develop: 'http://localhost:3001',
  develop_vercel: 'https://supereffective.vercel.app',
  preview: 'https://beta.supereffective.gg',
  production: 'https://supereffective.gg',
}

const config = {
  baseUrl: baseUrls[envName] || 'https://supereffective.gg',
  version: {
    num: '3.4.1',
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
  theme: {
    colors: {
      $primary: '#A692EB',
      $faviconBg: '#A692EB',
      marine: '#3F35BA',
      magenta: '#E93E65',
      purple: '#863B98',
      purpleLight: '#A692EB',
      slate: '#5A667A',
      slateLight: '#94A3B8',
      svdlc: {
        white1: '#FEFEFE',
        white2: '#C6C2BB',
        black1: '#363536',
        black2: '#24282B',
        pink1: '#C34E97',
        pink2: '#873973',
        okidogi: {
          green1: '#639533',
          green2: '#486839',
          yellow1: '#FBF176',
          yellow2: '#C0B65A',
        },
        munkidori: {
          blue1: '#96BCE8',
          blue2: '#6B7DA7',
          yellow1: '#FBF176',
          yellow2: '#C0B65A',
        },
        fezandipiti: {
          brown1: '#A84D24',
          brown2: '#80422D',
          yellow1: '#EAC228',
          yellow2: '#AA8C30',
        },
        ogerpon: {
          teal1: '#37AEA5',
          teal2: '#0D635A',
          brown1: '#DC9E61',
          brown2: '#A37446',
          green1: '#B3D8A0',
          green2: '#5BAC31',
        },
      },
    },
  },
}

export default config
