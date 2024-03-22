import appConfig from '@/config/app'
import { isDevelopmentEnv, isProductionEnv, isServerSide } from './env'

const pokeImgVariantFolder = {
  '2d': 'home2d-icon',
  '3d': 'home3d-icon',
  '3d-stroke': 'home3d-icon-bordered',
  pixelart: 'gen8-icon',
}

export function getPokeImgUrl(nid: string, variant: '2d' | '3d' | '3d-stroke' | 'pixelart', shiny = false): string {
  const folder = pokeImgVariantFolder[variant] + (shiny ? '/shiny' : '/regular')

  if (nid === 'placeholder') {
    return '/images/placeholders/placeholder-200x200.png'
  }

  const assetVersion = appConfig.assets.cacheVersion
  return `${appConfig.assets.imagesUrl}/pokemon/${folder}/${nid}.png?v=${assetVersion}`
}

export function getBaseUrl(): string {
  if (isProductionEnv()) {
    return 'https://supereffective.gg'
  }

  if (!isServerSide()) {
    // get absolute url in client/browser
    return location.origin
  }

  if (isDevelopmentEnv()) {
    return 'http://localhost:3001'
  }

  const previewUrl = _getVercelUrl()
  if (!previewUrl) {
    throw new Error('Impossible to determine the base url')
  }

  return previewUrl
}

export function getAbsUrl(path?: string): string {
  if (!path) {
    return getBaseUrl()
  }

  const sanitizedPath = path.replace(/^\/|\/$/g, '')
  return `${getBaseUrl()}${sanitizedPath ? `/${sanitizedPath}` : '/'}`
}

export function getGameCoverImageUrls(gameId: string): string {
  const fallbackSrc = `${appConfig.assets.imagesUrl}/games/tiles/${gameId}.jpg`
  return fallbackSrc
}

export function getDataCDNResourceUrl(filePath: string) {
  return `${appConfig.assets.dataUrl}/${filePath}`
}

export function getAssetsCDNResourceUrl(filePath: string) {
  return `${appConfig.assets.baseUrl}/${filePath}`
}

export function getSourceCodeUrl(
  path: string,
  branch = 'main',
  project: 'supereffective.gg' | 'dataset' | 'assets' = 'dataset',
) {
  return `https://github.com/supeffective/${project}/blob/${branch}/${path}`
}

function _getVercelUrl(): undefined | string {
  const protocol = isDevelopmentEnv() ? 'http://' : 'https://'
  const vercelUrl = process.env.VERCEL_URL

  if (vercelUrl && !vercelUrl.startsWith('http')) {
    return `${protocol}${vercelUrl}`
  }

  if (vercelUrl) {
    return vercelUrl
  }
}
