import { getPokemonRepository } from '../../pokemon/getPokemonRepository'
import { DexPokemon, DexPokemonList } from '../types'
import { convertPokemonListToStorable } from './convertPokemonListToStorable'

const repo = getPokemonRepository()

export const convertPokemonListToNormalized = (
  storedPokemonList: DexPokemonList,
  schemaVersion: number
): DexPokemonList => {
  return convertPokemonListToStorable(storedPokemonList, schemaVersion).map(
    (pkm: DexPokemon | null) => {
      if (pkm === null) return null

      const pkmEntry = repo.getPokemonEntry(pkm.pid)

      return {
        pid: pkm.pid,
        caught: pkm.caught,
        shiny: pkm.shiny,
        shinyLocked: repo.isShinyLocked(pkm.pid),
        shinyBase: pkmEntry.shinyBase,
        gmax: pkm.gmax,
        alpha: pkm.alpha,
      }
    }
  )
}
