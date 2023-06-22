import createMemoizedCallback from '@pkg/utils/lib/caching/createMemoizedCallback'
import { SimpleSearchIndex } from '@pkg/utils/lib/searching/algos/SimpleSearchIndex'

import pokemonEntries from '../../data/legacy/pokemon.json'
import { PokemonEntry, PokemonEntryMap, PokemonEntrySearchIndex, RawPokemonEntry } from './types'

export const getPokemonEntries = createMemoizedCallback((): PokemonEntry[] => {
  return (pokemonEntries as RawPokemonEntry[]).map(_transformPokemon)
})

export const getPokemonEntryMap = createMemoizedCallback((): PokemonEntryMap => {
  const map: PokemonEntryMap = new Map<string, PokemonEntry>()
  getPokemonEntries().forEach(entry => {
    map.set(entry.id, entry)
  })
  return map
})

export const getPokemonSearchIndex = createMemoizedCallback((): PokemonEntrySearchIndex => {
  const index = new SimpleSearchIndex<PokemonEntry[]>()
  index.buildWithTokens(getPokemonEntries(), [
    [
      'num',
      (pk: PokemonEntry) => {
        if (pk.dexNum !== null && pk.dexNum > 5000) {
          pk.dexNum = null
        }
        const dexNum = (pk.dexNum === null ? 0 : pk.dexNum).toString()
        return [dexNum, dexNum.padStart(3, '0'), dexNum.padStart(4, '0')]
      },
    ],
    ['name', (pk: PokemonEntry) => [pk.id, pk.name, pk.name.replace(/ /g, '').replace(/\s/g, '')]],
    ['type', (pk: PokemonEntry) => [pk.type1, pk.type2].filter(t => t) as string[]],
    ['base', (pk: PokemonEntry) => [pk.form.baseSpecies || pk.id]],
    ['color', (pk: PokemonEntry) => [pk.color || '']],
    ['id', (pk: PokemonEntry) => [pk.id || '']],
    ['obtainable', (pk: PokemonEntry) => pk.location.obtainableIn],
  ])

  return index
})

export function getPokemonEntry(pokemonId: string): PokemonEntry {
  const map = getPokemonEntryMap()
  if (map.has(pokemonId)) {
    return map.get(pokemonId)!
  }

  throw new Error(`Pokemon with ID '${pokemonId}' does not exist.`)
}

export function isShinyLocked(pokemonId: string): boolean {
  return !getPokemonEntry(pokemonId).shiny.released
}

function _transformPokemon(pokemon: RawPokemonEntry): PokemonEntry {
  const isUnown = pokemon.dexNum === 201

  if (isUnown) {
    // temporary fix for unown-f
    pokemon.isFemaleForm = false
    pokemon.hasGenderDifferences = false
  }

  return {
    id: pokemon.id,
    dexNum: pokemon.dexNum,
    name: pokemon.name,
    type1: pokemon.type1,
    type2: pokemon.type2,
    color: pokemon.color,
    shiny: {
      base: pokemon.shinyBase,
      released: pokemon.shinyReleased,
    },
    form: {
      isForm: pokemon.isForm,
      baseSpecies: pokemon.baseSpecies,
      isFemaleForm: pokemon.isFemaleForm,
      isMaleForm: pokemon.hasGenderDifferences && !pokemon.isFemaleForm,
      hasGenderForms: pokemon.hasGenderDifferences,
      hasGmax: pokemon.canGmax,
      isGmax: pokemon.isGmax,
    },
    location: {
      obtainableIn: pokemon.obtainableIn,
      eventOnlyIn: pokemon.eventOnlyIn,
      storableIn: pokemon.storableIn,
    },
  }
}
