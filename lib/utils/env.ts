export function hasDevFeaturesEnabled(): boolean {
  return isDevelopmentEnv() && !isCIEnv()
}

export function isProductionEnv(): boolean {
  return _getEnvName() === 'production'
}

export function isDevelopmentEnv(): boolean {
  return _getEnvName() === 'development'
}

export function isLocalDevelopmentEnv(): boolean {
  return isDevelopmentEnv() && !isCIEnv() && !isVercelEnv()
}

export function isLocalAssetsEnabled(): boolean {
  return (
    isDevelopmentEnv() &&
    (String(process.env['LOCAL_ASSETS_ENABLED']) === '1' ||
      String(process.env['NEXT_PUBLIC_LOCAL_ASSETS_ENABLED']) === '1')
  )
}

export function isPreviewEnv(): boolean {
  return _getEnvName() === 'preview'
}

export function isCIEnv(): boolean {
  return !!process.env['CI']
}

export function isVercelEnv(): boolean {
  return !!process.env['VERCEL']
}

export function isServerSide(): boolean {
  return typeof window === 'undefined'
}

export function isClientSide(): boolean {
  return typeof window !== 'undefined'
}

function _getEnvName(): string {
  return (process.env.VERCEL_ENV as string) || (process.env['NODE_ENV'] as string) || 'development'
}
