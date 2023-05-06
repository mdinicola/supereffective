export function hasDevFeaturesEnabled(): boolean {
  return isDevelopmentEnv() && !isCIEnv()
}

export function isProductionEnv(): boolean {
  return _getEnvName() === 'production'
}

export function isDevelopmentEnv(): boolean {
  return _getEnvName() === 'development'
}

export function isPreviewEnv(): boolean {
  return _getEnvName() === 'preview'
}

export function isCIEnv(): boolean {
  return !!process.env['CI']
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
