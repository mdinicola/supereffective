import { getLivingDexRepository } from './dexes/getLivingDexRepository'
import { getPresetRepository } from './dexes/presets/getPresetRepository'
import { getGameRepository } from './games/getGameRepository'
import { getGameSetRepository } from './games/getGameSetRepository'
import { getPokemonRepository } from './pokemon/getPokemonRepository'

const getDb = () => {
  return {
    games: getGameRepository(),
    gameSets: getGameSetRepository(),
    pokemon: getPokemonRepository(),
    dexPresets: getPresetRepository(),
    livingDexes: getLivingDexRepository(),
  }
}

export { getDb }
