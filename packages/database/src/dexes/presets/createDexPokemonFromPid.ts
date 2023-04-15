import { PokemonRepository } from '../../pokemon/types'
import { DexPokemon } from '../types'
import { PresetDexPokemon } from './types'

export function createDexPokemonFromPid(
  boxTitle: string,
  pid: PresetDexPokemon,
  shiny: boolean = false,
  pokeRepo: PokemonRepository
): DexPokemon {
  if (typeof pid === 'string') {
    const pkmEntry = pokeRepo.getPokemonEntry(pid)
    return {
      pid: pid,
      caught: false,
      shiny: shiny,
      shinyLocked: pokeRepo.isShinyLocked(pid),
      shinyBase: pkmEntry.shinyBase,
      gmax: false,
      alpha: false,
    }
  }

  const pkmEntry = pokeRepo.getPokemonEntry(pid.pid)
  return {
    pid: pid.pid,
    caught: pid.caught === true,
    shiny: shiny || pid.shiny === true,
    shinyLocked: pokeRepo.isShinyLocked(pid.pid) || pid.shinyLocked === true,
    shinyBase: pkmEntry.shinyBase,
    gmax: pid.gmax === true,
    alpha: pid.alpha === true,
  }
}
