import createMemoizedCallback from '@pkg/utils/src/caching/createMemoizedCallback'

import pokemonGmaxable from '../../data/builds/pokemon/gigantamaxable-pokemon.min.json'
import pokemonEntries from '../../data/builds/pokemon/pokemon-entries-minimal.min.json'
import shinyLockedPokemon from '../../data/builds/pokemon/pokemon-unobtainable-shiny.min.json'
import { DexPokemon } from '../dexes/types'
import { LegacyPokemonEntryMinimal, LegacyPokemonEntryMinimalMap } from './legacy_types'
import { PokemonRepository } from './types'

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

  const pokemonEntriesMap: LegacyPokemonEntryMinimalMap = {}

  pokemonEntries.forEach((entry: LegacyPokemonEntryMinimal) => {
    pokemonEntriesMap[entry.id] = { ...entry, shinyReleased: !isShinyLocked(entry.id) }
  })

  const getPokemonEntriesMap = (): LegacyPokemonEntryMinimalMap => {
    return pokemonEntriesMap
  }

  const getPokemonEntries = (): LegacyPokemonEntryMinimal[] => {
    return pokemonEntries
  }

  const getPokemonEntry = (pokemonId: string): LegacyPokemonEntryMinimal => {
    if (pokemonId in pokemonEntriesMap) {
      return pokemonEntriesMap[pokemonId]
    }

    throw new Error(`No pokemon entry found for ${pokemonId}`)
  }

  const canGmax = (pokemonId: string): boolean => {
    return pokemonGmaxable.includes(pokemonId)
  }

  const isCatchable = (pokemon: DexPokemon): boolean => {
    // TODO: this logic belongs to the Dexes module
    return !(pokemon.shiny && isShinyLocked(pokemon.pid))
  }

  return {
    getPokemonEntries,
    getPokemonEntriesMap,
    getPokemonEntry,
    isCatchable,
    isShinyLocked,
    canGmax,
  }
})
