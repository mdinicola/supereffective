const { generateIdsTsFileFromData } = require('./codegen.cjs')
const path = require('node:path')
const srcDir = path.resolve(path.join(__dirname, '..', '..', 'repositories'))

const BASE_DATA_URL = 'https://itsjavi.com/supereffective-sdk/data'

async function fetchDataFile(filename) {
  return fetch(`${BASE_DATA_URL}/${filename}`).then(res => res.json())
}

fetchDataFile('pokemon.min.json').then(data => {
  if (!Array.isArray(data)) {
    throw new Error('[fetchDataFile] Expected array when fetching pokemon.min.json')
  }
  console.log(`[fetchDataFile] Fetched ${data.length} pokemon from pokemon.min.json`)
  generateIdsTsFileFromData(data, path.resolve(path.join(srcDir, 'pokemon', 'ids.ts')), 'pokemon')
})

fetchDataFile('legacy-gamesets.min.json').then(data => {
  if (!Array.isArray(data)) {
    throw new Error('[fetchDataFile] Expected array when fetching legacy-gamesets.min.json')
  }

  console.log(`[fetchDataFile] Fetched ${data.length} gamesets from legacy-gamesets.min.json`)
  generateIdsTsFileFromData(data, path.resolve(path.join(srcDir, 'game-sets', 'ids.ts')), 'gameSet')

  const games = data.flatMap(({ id: gameSetId, games }) => {
    return Object.entries(games).map(([id, game]) => ({
      id,
      name: game,
      gameSet: gameSetId,
    }))
  })

  generateIdsTsFileFromData(games, path.resolve(path.join(srcDir, 'games', 'ids.ts')), 'game')
})
