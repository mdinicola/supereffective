import fs from 'node:fs/promises'
import path from 'node:path'

const upstreamUrl = 'https://itsjavi.com/supereffective-assets/assets/data'
const dataFiles = [
  'legacy/box-presets.json',
  'legacy/games.json',
  'legacy/gamesets.json',
  'legacy/pokemon.json',
  'abilities.json',
  'colors.json',
  'gamesets.json',
  'gamesupersets.json',
  'items.json',
  'languages.json',
  'locations.json',
  'marks.json',
  'moves.json',
  'natures.json',
  'originmarks.json',
  'pokedexes.json',
  'pokemon.d.json.ts',
  'pokemon.json',
  'regions.json',
  'ribbons.json',
  'types.json',
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
    dataFiles.map(async file => {
      const url = `${upstreamUrl}/${file}`
      const filePath = path.join(dataDir, file)
      return download(url, filePath)
    })
  )
}

main()
