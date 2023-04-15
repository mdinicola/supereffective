import createMemoizedCallback from '@pkg/utils/src/universal/createMemoizedCallback'

import pokemonGmaxable from '../../data/builds/pokemon/gigantamaxable-pokemon.min.json'
import pokemonEntries from '../../data/builds/pokemon/pokemon-entries-minimal.min.json'
import shinyLockedPokemon from '../../data/builds/pokemon/pokemon-unobtainable-shiny.min.json'
import { DexPokemon } from '../dexes/types'
import { PokemonEntryMinimal, PokemonEntryMinimalMap, PokemonRepository } from './types'

export const getPokemonRepository = createMemoizedCallback((): PokemonRepository => {
  // todo convert to a real Map
  const shinyLockedPokemonMap: { [key: string]: true } = shinyLockedPokemon.reduce(
    (acc, pokemon) => {
      acc[pokemon] = true
      return acc
    },
    {} as { [key: string]: true }
  )

  const isShinyLocked = (pokemonId: string): boolean => {
    return pokemonId in shinyLockedPokemonMap && shinyLockedPokemonMap[pokemonId]
  }

  const pokemonEntriesMap: PokemonEntryMinimalMap = {}

  pokemonEntries.forEach((entry: PokemonEntryMinimal) => {
    pokemonEntriesMap[entry.id] = { ...entry, shinyReleased: !isShinyLocked(entry.id) }
  })

  const getPokemonEntriesMap = (): PokemonEntryMinimalMap => {
    return pokemonEntriesMap
  }

  const getPokemonEntries = (): PokemonEntryMinimal[] => {
    return pokemonEntries
  }

  const getPokemonEntry = (pokemonId: string): PokemonEntryMinimal => {
    if (pokemonId in pokemonEntriesMap) {
      return pokemonEntriesMap[pokemonId]
    }

    throw new Error(`No pokemon entry found for ${pokemonId}`)
  }

  const canGmax = (pokemonId: string): boolean => {
    return pokemonGmaxable.includes(pokemonId)
  }

  const isCatchable = (pokemon: DexPokemon): boolean => {
    return !(pokemon.shiny && isShinyLocked(pokemon.pid))
  }

  return {
    getPokemonEntries,
    getPokemonEntriesMap,
    getPokemonEntry,
    isShinyLocked,
    isCatchable,
    canGmax,
  }
})
