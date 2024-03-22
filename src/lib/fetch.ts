export async function fetchImgAsDataUri(
  url: string,
  mimeType = 'image/png',
  revalidate = 300,
  tags: string[] = [],
): Promise<string | undefined> {
  const imageRes = await fetch(url, { next: { revalidate, tags } }).catch((e) => {
    console.error('Failed to fetch image:', url, e)
    return undefined
  })

  if (!imageRes || !imageRes.ok) {
    return undefined
  }

  const buffer = await imageRes.arrayBuffer()
  return `data:${mimeType};base64,${Buffer.from(buffer).toString('base64')}`
}

export class HttpError extends Error {
  constructor(
    public url: string,
    public response: Response,
  ) {
    super(`Failed to fetch ${url}. HTTP Error was ${response.status} ${response.statusText}`)
  }
}

export async function fetchJson<T = unknown>(
  url: string | Request | URL,
  init?: FetchRequestInit | undefined,
  revalidate = 300,
  tags: string[] = [],
): Promise<T> {
  const resp = await fetch(url, { ...init, next: { revalidate, tags } })
  if (!resp.ok) {
    throw new HttpError(url.toString(), resp)
  }

  return await resp.json()
}
