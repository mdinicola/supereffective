const { generateIdsTsFile } = require('./codegen.cjs')
const path = require('node:path')

const dataDir = path.resolve(path.join(__dirname, '..', '..', 'data'))
const srcDir = path.resolve(path.join(__dirname, '..', 'repositories'))

generateIdsTsFile(
  path.resolve(path.join(dataDir, 'sources', 'abilities.json')),
  path.resolve(path.join(srcDir, 'abilities', 'ids.ts')),
  'ability'
)

generateIdsTsFile(
  path.resolve(path.join(dataDir, 'sources', 'items.json')),
  path.resolve(path.join(srcDir, 'items', 'ids.ts')),
  'item'
)

generateIdsTsFile(
  path.resolve(path.join(dataDir, 'sources', 'moves.json')),
  path.resolve(path.join(srcDir, 'moves', 'ids.ts')),
  'move'
)

generateIdsTsFile(
  path.resolve(path.join(dataDir, 'sources', 'natures.json')),
  path.resolve(path.join(srcDir, 'natures', 'ids.ts')),
  'nature'
)

generateIdsTsFile(
  path.resolve(path.join(dataDir, 'sources', 'pokedexes.json')),
  path.resolve(path.join(srcDir, 'pokedexes', 'ids.ts')),
  'pokedex'
)

generateIdsTsFile(
  path.resolve(path.join(dataDir, 'builds', 'pokemon', 'pokemon-entries-minimal.json')),
  path.resolve(path.join(srcDir, 'pokemon', 'ids.ts')),
  'pokemon'
)

generateIdsTsFile(
  path.resolve(path.join(dataDir, 'sources', 'regions.json')),
  path.resolve(path.join(srcDir, 'regions', 'ids.ts')),
  'region'
)

generateIdsTsFile(
  path.resolve(path.join(dataDir, 'sources', 'types.json')),
  path.resolve(path.join(srcDir, 'types', 'ids.ts')),
  'pokemonType'
)

generateIdsTsFile(
  path.resolve(path.join(dataDir, 'sources', 'games', 'game-sets.json')),
  path.resolve(path.join(srcDir, 'game-sets', 'ids.ts')),
  'gameSet'
)

generateIdsTsFile(
  path.resolve(path.join(dataDir, 'builds', 'games.json')),
  path.resolve(path.join(srcDir, 'games', 'ids.ts')),
  'game'
)
