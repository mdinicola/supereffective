const { generateIdsTsFile, generateIdsTsFileFromData } = require('./codegen.cjs')
const path = require('node:path')

const dataDir = path.resolve(path.join(__dirname, '..', '..', 'data'))
const srcDir = path.resolve(path.join(__dirname, '..', '..', 'repositories'))

// generateIdsTsFile(
//   path.resolve(path.join(dataDir, 'abilities.json')),
//   path.resolve(path.join(srcDir, 'abilities', 'ids.ts')),
//   'ability'
// )

generateIdsTsFile(
  path.resolve(path.join(dataDir, 'items.json')),
  path.resolve(path.join(srcDir, 'items', 'ids.ts')),
  'item'
)

generateIdsTsFile(
  path.resolve(path.join(dataDir, 'moves.json')),
  path.resolve(path.join(srcDir, 'moves', 'ids.ts')),
  'move'
)

generateIdsTsFile(
  path.resolve(path.join(dataDir, 'natures.json')),
  path.resolve(path.join(srcDir, 'natures', 'ids.ts')),
  'nature'
)

// generateIdsTsFile(
//   path.resolve(path.join(dataDir, 'pokedexes.json')),
//   path.resolve(path.join(srcDir, 'pokedexes', 'ids.ts')),
//   'pokedex'
// )

generateIdsTsFile(
  path.resolve(path.join(dataDir, 'pokemon.json')),
  path.resolve(path.join(srcDir, 'pokemon', 'ids.ts')),
  'pokemon'
)

generateIdsTsFile(
  path.resolve(path.join(dataDir, 'regions.json')),
  path.resolve(path.join(srcDir, 'regions', 'ids.ts')),
  'region'
)

generateIdsTsFile(
  path.resolve(path.join(dataDir, 'types.json')),
  path.resolve(path.join(srcDir, 'types', 'ids.ts')),
  'pokemonType'
)

generateIdsTsFile(
  path.resolve(path.join(dataDir, 'gamesets.json')),
  path.resolve(path.join(srcDir, 'game-sets', 'ids.ts')),
  'gameSet'
)

const _gameSetRecords = require(path.resolve(path.join(dataDir, 'gamesets.json')))

const games = _gameSetRecords.flatMap(({ id: gameSetId, games }) => {
  return Object.entries(games).map(([id, game]) => ({
    id,
    name: game,
    gameSet: gameSetId,
  }))
})

generateIdsTsFileFromData(games, path.resolve(path.join(srcDir, 'games', 'ids.ts')), 'game')
