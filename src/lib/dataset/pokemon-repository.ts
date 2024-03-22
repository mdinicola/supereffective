import type { Pokemon } from '@supeffective/dataset'
import { assertServerOnly } from '../env'
import { fetchJson } from '../fetch'
import { getDataCDNResourceUrl } from '../urls'
import { mapBy } from '../utils'
import type { TrPokemon, TrPokemonFlags, TrPokemonStats, TrSourcePokemon } from './types'

assertServerOnly()

let pokemonSourceDataset: TrSourcePokemon[] | null = null

export async function getPokemonData(): Promise<TrPokemon[]> {
  if (!pokemonSourceDataset) {
    pokemonSourceDataset = await loadPokemon()
  }

  const pokemonDataset: TrPokemon[] = pokemonSourceDataset.map((pkm: TrSourcePokemon): TrPokemon => {
    if (!pkm.types[0]) {
      throw new Error(`Pokemon first type for ${pkm.id} has a nullish value`)
    }

    const expandedPkmData = {
      ...pkm,
      speciesName: pkm.speciesName,
      types: [pkm.types[0], pkm.types[1] ?? null],
      flags: _getPokemonFlagsAsObject(pkm),
      stats: _getPokemonStatsAsObject(pkm),
      searchText: '',
    } satisfies TrPokemon

    expandedPkmData.searchText = _generatePokemonSearchableText(expandedPkmData)

    return expandedPkmData
  })

  return pokemonDataset
}

function _getPokemonStatsAsObject(pkm: TrSourcePokemon): TrPokemonStats {
  const stats = pkm.stats

  if (stats.length !== 6) {
    throw new Error(`Pokemon ${pkm.id} has ${stats.length} stat values instead of 6`)
  }

  return {
    hp: stats[0],
    atk: stats[1],
    def: stats[2],
    spAtk: stats[3],
    spDef: stats[4],
    speed: stats[5],
    total: stats.reduce((acc, val) => acc + val, 0),
  }
}

function _getPokemonFlagsAsObject(pkm: TrSourcePokemon): TrPokemonFlags {
  const expectedFlagsLength = 13
  const flags = pkm.flags

  if (flags.length !== expectedFlagsLength) {
    throw new Error(`Pokemon ${pkm.id} has ${flags.length} flags instead of ${expectedFlagsLength}`)
  }

  return {
    isForm: flags[0],
    canBeShiny: flags[1],
    canBeMale: flags[2],
    canBeFemale: flags[3],
    isFemaleForm: flags[4],
    isCosmeticForm: flags[5],
    isRegional: flags[6],
    isUltraBeast: flags[7],
    isParadox: flags[8],
    isConvergent: flags[9],
    isLegendary: flags[10],
    isMythical: flags[11],
    hasGenderDifferences: flags[12],
  }
}

function _generatePokemonSearchableText(pkm: TrPokemon): string {
  const { name, slug, region, types, color } = pkm
  const {
    isForm,
    canBeShiny,
    canBeMale,
    canBeFemale,
    isFemaleForm,
    isCosmeticForm,
    isRegional,
    isUltraBeast,
    isParadox,
    isConvergent,
    isLegendary,
    isMythical,
  } = pkm.flags

  const normalTokens = [
    name,
    slug,
    `:region:${region}`,
    `:color:${color}`,
    types
      .filter(Boolean)
      .map((type) => `:type:${type}`)
      .join(' '),
  ].join(' ')

  const conditionalTokens = [
    isForm ? ':form' : '',
    !canBeShiny ? ':shinylocked :noshiny' : '',
    !canBeMale || isFemaleForm ? ':gender:femaleonly' : '',
    !canBeFemale ? ':gender:maleonly' : '',
    isCosmeticForm ? ':cosmeticform' : '',
    isRegional ? ':regional' : '',
    isUltraBeast ? ':ultrabeast' : '',
    isParadox ? ':paradox' : '',
    isConvergent ? ':convergent' : '',
    isLegendary ? ':legendary' : '',
    isMythical ? ':mythical' : '',
  ].join(' ')

  return `${normalTokens} ${conditionalTokens}`.toLowerCase()
}

async function loadPokemon(): Promise<TrSourcePokemon[]> {
  const pokemonDataUrl = getDataCDNResourceUrl('pokemon.min.json') // HEAVY ~2MB
  const pokemonSrc = await fetchJson<Pokemon[]>(pokemonDataUrl)
  const pokemonSrcMap = mapBy(pokemonSrc, 'id')
  const pokemon = pokemonSrc.map((pkm) => {
    const speciesName = pokemonSrcMap[pkm.baseSpecies ?? pkm.id]?.name ?? pkm.name

    return {
      id: pkm.nid,
      natNum: pkm.dexNum,
      slug: pkm.id,
      name: pkm.name,
      speciesName,
      region: pkm.region,
      types: [pkm.type1, pkm.type2],
      color: pkm.color,
      stats: [
        pkm.baseStats.hp,
        pkm.baseStats.atk,
        pkm.baseStats.def,
        pkm.baseStats.spa,
        pkm.baseStats.spd,
        pkm.baseStats.spe,
      ],
      flags: [
        pkm.isForm,
        pkm.shinyReleased,
        pkm.maleRate > 0,
        pkm.femaleRate > 0,
        pkm.isFemaleForm,
        pkm.isCosmeticForm,
        pkm.isRegional,
        pkm.isUltraBeast,
        pkm.paradoxSpecies ? pkm.paradoxSpecies?.length > 0 : false,
        pkm.convergentSpecies ? pkm.convergentSpecies?.length > 0 : false,
        pkm.isLegendary,
        pkm.isMythical,
        pkm.hasGenderDifferences,
      ],
      forms: pkm.forms ?? [],
    } satisfies TrSourcePokemon
  })

  return pokemon
}
