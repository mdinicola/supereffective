export function dataUriToBuffer(dataUri: string): Buffer {
  const base64 = dataUri.split(',')[1]
  return Buffer.from(base64, 'base64')
}
