export async function fetchImgAsDataUri(
  url: string,
  mimeType = 'image/png',
  revalidate = 300,
): Promise<string | undefined> {
  const imageRes = await fetch(url, { next: { revalidate } }).catch((e) => {
    console.error('Failed to fetch image:', url, e)
    return undefined
  })

  if (!imageRes || !imageRes.ok) {
    return undefined
  }

  const buffer = await imageRes.arrayBuffer()
  return `data:${mimeType};base64,${Buffer.from(buffer).toString('base64')}`
}
