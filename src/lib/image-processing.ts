import { getAverageColor } from 'fast-average-color-node'
import { dataUriToBuffer } from './buffers'

type IgnoredColor =
  | [number, number, number]
  | [number, number, number, number]
  | [number, number, number, number, number]

export async function getImageDominantColor(image: string | Buffer, ignoredColors?: IgnoredColor[]) {
  let resource = image
  if (typeof image === 'string' && image.startsWith('data:')) {
    resource = dataUriToBuffer(image)
  }
  return await getAverageColor(resource, { algorithm: 'dominant', ignoredColor: ignoredColors })
}

export async function getImageAverageColor(image: string | Buffer, ignoredColors?: IgnoredColor[]) {
  let resource = image
  if (typeof image === 'string' && image.startsWith('data:')) {
    resource = dataUriToBuffer(image)
  }
  return await getAverageColor(resource, { algorithm: 'sqrt', ignoredColor: ignoredColors })
}

export async function getImageColors(image: string | Buffer, ignoredColors?: IgnoredColor[]) {
  let resource = image
  if (typeof image === 'string' && image.startsWith('data:')) {
    resource = dataUriToBuffer(image)
  }

  const threshold = 35
  const blackThreshold = 65
  const _ignoredColors = ignoredColors ?? [
    // [red (0-255), green (0-255), blue (0-255), alpha (0-255), treshold (0-255)]
    [255, 255, 255, 255, threshold], // white
    [255, 255, 255, 127, threshold], // semi-transparent white
    [255, 255, 255, 0, threshold], // transparent white
    [0, 0, 0, 255, blackThreshold], // black
    [0, 0, 0, 127, blackThreshold], // semi-transparent black
    [0, 0, 0, 0, blackThreshold], // transparent black
    [1, 1, 1, 255, blackThreshold], // almost-black
    [1, 1, 1, 127, blackThreshold], // semitransparent almost-black
    [1, 1, 1, 0, blackThreshold], // transparent almost-black
  ]

  const avgColor = await getImageAverageColor(resource, _ignoredColors)
  const domColor = await getImageDominantColor(resource, _ignoredColors)

  return { avg: avgColor, dominant: domColor }

  // const secondaryDomColor = await getImageDominantColor(resource, [
  //   ..._ignoredColors,
  //   [0, 0, 0, 0.5, 130],
  //   [0, 0, 0, 1, 130],
  //   [10, 10, 10, 0.5, 130],
  //   [100, 100, 100, 0.5, 130],
  //   [130, 130, 130, 0.5, 130],
  //   [...domColor.value, 100],
  //   [...avgColor.value, 100],
  // ])

  // return { avg: avgColor, dominant: domColor, secondary: secondaryDomColor }
}
