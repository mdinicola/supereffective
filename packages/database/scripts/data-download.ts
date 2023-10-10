import fs from 'node:fs/promises'
import path from 'node:path'

const upstreamUrlAssets = 'https://itsjavi.com/supereffective-assets/assets/data'
const upstreamUrlSdk = 'https://itsjavi.com/supereffective-sdk/data'

const dataFiles = [
  // base url, remote file, local file
  [upstreamUrlSdk, 'legacy-boxpresets.min.json', 'legacy/box-presets.json'],
  [upstreamUrlSdk, 'legacy-pokemon.min.json', 'legacy/pokemon.json'],
  [upstreamUrlSdk, 'abilities.min.json', 'abilities.json'],
  [upstreamUrlSdk, 'colors.min.json', 'colors.json'],
  [upstreamUrlSdk, 'items.min.json', 'items.json'],
  [upstreamUrlSdk, 'languages.min.json', 'languages.json'],
  [upstreamUrlSdk, 'locations.min.json', 'locations.json'],
  [upstreamUrlSdk, 'marks.min.json', 'marks.json'],
  [upstreamUrlSdk, 'moves.min.json', 'moves.json'],
  [upstreamUrlSdk, 'natures.min.json', 'natures.json'],
  [upstreamUrlSdk, 'originmarks.min.json', 'originmarks.json'],
  [upstreamUrlSdk, 'pokedexes.min.json', 'pokedexes.json'],
  [upstreamUrlSdk, 'pokemon.min.json', 'pokemon.json'],
  [upstreamUrlSdk, 'regions.min.json', 'regions.json'],
  [upstreamUrlSdk, 'ribbons.min.json', 'ribbons.json'],
  [upstreamUrlSdk, 'types.min.json', 'types.json'],

  // TODO: change to upstreamUrlSdk
  [upstreamUrlAssets, 'legacy/games.json', 'legacy/games.json'],
  [upstreamUrlAssets, 'legacy/gamesets.json', 'legacy/gamesets.json'],
  [upstreamUrlAssets, 'gamesets.json', 'gamesets.json'],
  [upstreamUrlAssets, 'gamesupersets.json', 'gamesupersets.json'],
  // 'abilities.json',
  // 'pokedexes.json',
]

const dataDir = path.resolve(path.join(__dirname, '../data'))

async function download(url: string, dest: string) {
  return fetch(url).then(async res => {
    if (!res.body) {
      throw new Error('No body')
    }
    const rawBody = await res.text()
    return fs.writeFile(dest, rawBody)
  })
}

const main = async () => {
  await fs.mkdir(dataDir + '/legacy', { recursive: true })
  await Promise.all(
    dataFiles.map(async mapping => {
      const [upstreamUrl, remoteFile, localFile] = mapping
      const url = `${upstreamUrl}/${remoteFile}`
      const filePath = path.join(dataDir, localFile)
      return download(url, filePath)
    })
  )
}

main()
