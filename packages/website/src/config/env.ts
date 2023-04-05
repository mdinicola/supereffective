export function isProductionEnv(): boolean {
  return _getVercelEnvName() === 'production'
}

export function isDevelopmentEnv(): boolean {
  return _getVercelEnvName() === 'development'
}

export function isPreviewEnv(): boolean {
  return _getVercelEnvName() === 'preview'
}

export function isServerSide(): boolean {
  return typeof window === 'undefined'
}

export function getBaseUrl(): string {
  // get absolute url in client/browser
  if (!isServerSide()) {
    return location.origin
  }
  // get absolute url in server.
  return _getVercelUrl()
}

export function getFullUrl(path?: string): string {
  const sanitizedPath = path.replace(/^\/|\/$/g, '')
  return `${getBaseUrl()}${sanitizedPath ? '/' + sanitizedPath : '/'}`
}

function _getHttpProtocol() {
  if (isDevelopmentEnv()) return 'http://'
  return 'https://'
}

function _getVercelEnvName(): string {
  return (process.env.VERCEL_ENV as string) || 'development'
}

function _getVercelUrl(): string {
  if (process.env.VERCEL_URL) {
    return `${_getHttpProtocol()}${process.env.VERCEL_URL}`
  }

  return ''
}
