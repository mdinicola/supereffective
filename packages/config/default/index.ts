import { isDevelopmentEnv } from '@pkg/utils/lib/env'
import { getBaseUrl } from '@pkg/utils/lib/nextjs/urls'

// !!! Changing these versions will make Vercel to optimize all images again
//      (producing costs of 5$ every 1000 extra images)

const ASSETS_CACHE_VERSION = '20230809-01'
const ASSETS_CACHE_VERSION_INCREMENTAL = '20230924-01'

const config = {
  dev: isDevelopmentEnv(),
  baseUrl: getBaseUrl(),
  version: {
    num: '4.0.5',
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
    twitter: 'https://mobile.twitter.com/supereffectiv',
    patreon: 'https://www.patreon.com/supereffective',
    github: 'https://github.com/itsjavi',
    github_org: 'https://github.com/supeffective',
    github_site: 'https://github.com/supeffective/website',
    issue_report: 'https://github.com/supeffective/website/issues',
    roadmap: 'https://github.com/orgs/supeffective/projects',
    discord: 'https://discord.gg/3fRXQFtrkN',
    paypal_donate: 'https://www.paypal.me/itsjavidotcom/10',
    legacy_account_recovery_form: 'https://forms.gle/HxnV3qCs1UWJn7Tc6',
  },
  patreon: {
    oauthRedirectUrl: `${getBaseUrl()}/api/callbacks/patreon`,
    webhookCallbackUrl: `${getBaseUrl()}/api/webhooks/patreon`,
  },
  assets: {
    version: ASSETS_CACHE_VERSION,
    getPokeImgVersion(nid: string): string {
      if (nid.includes('paldea') || nid.includes('bloodmoon')) {
        return ASSETS_CACHE_VERSION_INCREMENTAL
      }

      const dexNum = parseInt(nid.split('-')[0].replace(/^0+/, ''))

      if (dexNum > 1010) {
        return ASSETS_CACHE_VERSION_INCREMENTAL
      }

      return ASSETS_CACHE_VERSION
    },
    baseUrl: 'https://cdn.supeffective.com/assets',
    dataUrl: 'https://cdn.supeffective.com/dataset',
    fontsUrl: 'https://cdn.supeffective.com/assets/fonts',
    imagesUrl: 'https://cdn.supeffective.com/assets/images',
  },
}

export default config
