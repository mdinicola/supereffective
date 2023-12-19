import config from '@pkg/config/default'
import { isDevelopmentEnv } from '@pkg/utils/lib/env'

export const BASE_DATA_URL = config.assets.dataUrl
export const DEFAULT_FETCH_TTL = 1000 * 60 * 15 // 15 minutes
const LOCAL_FETCH_TTL = 1000 * 30 // 30 seconds

type FetchInit = RequestInit & {
  next?: {
    revalidate?: number
    tags?: string[]
  }
}

export async function fetchData<T>(relativeUrl: string, init?: FetchInit): Promise<T> {
  if (!relativeUrl.startsWith('/')) {
    throw new Error(`[fetchData] Relative URL does not start with slash: ${relativeUrl}`)
  }

  const url = BASE_DATA_URL + relativeUrl
  if (isDevelopmentEnv()) {
    console.log('[fetchData] Fetching', url)
  }
  const resolvedInit: FetchInit = {
    ...init,
    next: {
      revalidate: isDevelopmentEnv() ? LOCAL_FETCH_TTL : DEFAULT_FETCH_TTL,
      ...(init && init.next),
    },
  }

  return fetch(url, resolvedInit)
    .then(res => res.json())
    .catch(err => {
      console.error(`[fetchData] Error fetching ${url}: ${err}`)
      return null
    })
}
