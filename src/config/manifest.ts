import type { WebManifest } from '@/lib/types'
import { cssVarsConfig } from '@/styles/variables.config'
import appConfig from './app'

const icon96x96 = '/favicon/favicon-96x96.png'

/**
 * Web Manifest configuration
 */
const manifestConfig: WebManifest = {
  id: 'gg.supereffective.app',
  name: appConfig.siteName,
  short_name: appConfig.text.pwaName,
  description: appConfig.text.pwaDescription,
  theme_color: cssVarsConfig.colors.primary.pwaTheme,
  background_color: cssVarsConfig.colors.primary.pwaTheme,
  start_url: './v4',
  lang: 'en-US',
  orientation: 'portrait',
  display: 'standalone',
  display_override: ['window-controls-overlay'],
  edge_side_panel: {
    preferred_width: 496,
  },
  // @see https://www.w3.org/TR/manifest-app-info/#categories-member
  categories: ['entertainment', 'games', 'utilities'],
  icons: [
    {
      src: '/favicon/favicon-48x48.png',
      sizes: '48x48',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: '/favicon/maskable/maskable_icon_x48.png',
      sizes: '48x48',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: '/favicon/maskable/maskable_icon_x72.png',
      sizes: '72x72',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: icon96x96,
      sizes: '96x96',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: '/favicon/maskable/maskable_icon_x96.png',
      sizes: '96x96',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: '/favicon/favicon-128x128.png',
      sizes: '128x128',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: '/favicon/maskable/maskable_icon_x128.png',
      sizes: '128x128',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: '/favicon/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: '/favicon/maskable/maskable_icon_x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: '/favicon/favicon-256x256.png',
      sizes: '256x256',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: '/favicon/maskable/maskable_icon_x256.png',
      sizes: '256x256',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: '/favicon/android-chrome-384x384.png',
      sizes: '384x384',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: '/favicon/maskable/maskable_icon_x384.png',
      sizes: '384x384',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: '/favicon/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: '/favicon/maskable/maskable_icon_x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: '/favicon/maskable/maskable_icon.png',
      sizes: '1024x1024',
      type: 'image/png',
      purpose: 'maskable',
    },
  ],
  screenshots: [
    {
      src: '/images/screenshots/sv3-001.jpg',
      sizes: '1280x720',
      type: 'image/jpg',
      form_factor: 'wide',
      label: "SuperEffective's Pokédex and Tracker",
    },
    {
      src: '/images/screenshots/sv3-001-mobile.jpg',
      sizes: '640x720',
      type: 'image/jpg',
      form_factor: 'narrow',
      label: "SuperEffective's Living Dex Tracker",
    },
  ],
  shortcuts: [
    {
      name: 'Pokédex',
      short_name: 'Pokédex',
      description: 'Pokédex page',
      url: '/apps/pokedex',
      icons: [
        {
          src: icon96x96,
          sizes: '96x96',
          type: 'image/png',
        },
      ],
    },
    {
      name: 'Living Dexes',
      short_name: 'LivingDex',
      description: 'Living Dexes page',
      url: '/apps/livingdex',
      icons: [
        {
          src: icon96x96,
          sizes: '96x96',
          type: 'image/png',
        },
      ],
    },
    {
      name: 'Missing Pokémon',
      short_name: 'Missing',
      description: 'Missing Pokémon page',
      url: '/apps/livingdex/missing',
      icons: [
        {
          src: icon96x96,
          sizes: '96x96',
          type: 'image/png',
        },
      ],
    },
  ],
}

export default manifestConfig
