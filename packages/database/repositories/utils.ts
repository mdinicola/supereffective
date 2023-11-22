export const BASE_DATA_URL = 'https://cdn.supeffective.com/dataset'
export const DEFAULT_FETCH_TTL = 1000 * 60 * 15 // 15 minutes

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
  const resolvedInit: FetchInit = {
    ...init,
    next: {
      revalidate: DEFAULT_FETCH_TTL,
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
