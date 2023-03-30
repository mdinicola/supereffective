import _data from './config.json'

const envName = (process.env.NEXT_PUBLIC_ENV as string) || 'develop'
const baseUrl: string = (_data.baseUrls as any)[envName] || 'https://supereffective.gg'

let data = {
  baseUrl,
  isPreview: envName === 'preview',
  ..._data,
}

if (envName === 'develop') {
  data.limits.maxDexes = 20
}

export default data
