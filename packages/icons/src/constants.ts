export const PKM_LOCAL_ASSETS_URL = 'http://localhost:3999/assets'
export const PKM_REMOTE_ASSETS_URL = 'https://itsjavi.com/supereffective-assets/assets'

const envName = process.env.NODE_ENV ?? 'development'
const envAssetsUrl = process.env.PKM_ASSETS_URL ?? undefined

const fallbackUrl = envName === 'development' ? PKM_LOCAL_ASSETS_URL : PKM_REMOTE_ASSETS_URL

export const PKM_DEFAULT_ASSETS_URL = envAssetsUrl || fallbackUrl
