import shinyLockedPokemon from '#/data/builds/pokemon/pokemon-unobtainable-shiny.min.json'
import {
  GAME_SETS,
  GameId,
  GameSetId,
  getGame,
  getGameSet,
  getPresetForGameSet,
  SUPPORTED_GAME_SETS,
  SUPPORTED_GAMES,
} from '#/features/legacy/livingdex/games'
import { getPokemonEntry } from '#/features/legacy/livingdex/pokemon'
import {
  Dex,
  DEX_SCHEMA_VERSION,
  DexBox,
  DexList,
  DexPokemon,
  NullableDexPokemon,
  NullableStorableDexPokemon,
  RawUserOwnedDocument,
  StorableDex,
  StorableDexBox,
  StorableDexPokemon,
} from '#/services/legacy/datastore/types'
import { debug, getUtcTimestamp } from '#/utils/legacyUtils'

const shinyLockedPokemonMap: { [key: string]: true | undefined } = shinyLockedPokemon.reduce(
  (acc, pokemon) => {
    acc[pokemon] = true
    return acc
  },
  {} as { [key: string]: true }
)

// todo move to config.json
const defaultGame = 'home'
const defaultGameSet = 'home'
const defaultPreset = 'fully-sorted'
const defaultPresetVersion = 0
export const LEFTOVER_BOX_NAME = 'TERU-SAMA'

export type PresetDexPokemon =
  | {
      pid: string
      caught?: boolean
      shiny?: boolean
      shinyLocked?: boolean
      gmax?: boolean
      alpha?: boolean
    }
  | string

export type NullablePresetDexPokemon = PresetDexPokemon | null

export interface PresetDexBox {
  title?: string
  pokemon: NullablePresetDexPokemon[]
}

export interface PresetDex {
  id: string
  name: string
  version: number
  game?: GameId | string | undefined
  gameSet: GameSetId | string
  description: string
  boxes: PresetDexBox[]
}

export interface PresetDexMap {
  [gameId: string]: {
    [presetId: string]: PresetDex
  }
}

export const getRealBoxesCount = (dex: Dex): number => {
  const gameSet = GAME_SETS[dex.gameSetId]
  if (!gameSet) {
    throw new Error(`Unknown gameSetId: ${dex.gameSetId}`)
  }
  const maxBoxes = gameSet.storage?.boxes || 0
  if (maxBoxes <= 1) {
    return maxBoxes
  }
  if (maxBoxes < dex.boxes.length) {
    return maxBoxes
  }
  return dex.boxes.length
}

export const isShinyLocked = (pokemonId: string): boolean => {
  return shinyLockedPokemonMap[pokemonId] === true
}

export const isNotCatchable = (pokemon: DexPokemon | StorableDexPokemon): boolean => {
  return pokemon.shiny && isShinyLocked(pokemon.pid)
}

export const isCatchable = (pokemon: DexPokemon | StorableDexPokemon): boolean => {
  return !isNotCatchable(pokemon)
}

const getBoxTitle = (
  gameSet: GameSetId,
  prevTitle: string | null | undefined,
  currentBoxNum: number
): string => {
  if (gameSet === 'go' || gameSet === 'lgpe') {
    return prevTitle || `Storage System`
  }
  if (gameSet === 'la') {
    return prevTitle || `Pasture ${currentBoxNum}`
  }
  return prevTitle || `Box ${currentBoxNum}`
}

export const dexWithRecalculatedCounters = (dex: Dex): Dex => {
  const counters = dex.boxes.reduce(
    (accumulator, box) => {
      return box.pokemon.reduce((acc, pokemon) => {
        if (!pokemon) {
          return accumulator
        }
        if (pokemon.shiny && !pokemon.shinyLocked) {
          accumulator.totalShiny++
          if (pokemon.caught) {
            accumulator.caughtShiny++
          }
          return accumulator
        }

        if (!pokemon.shiny) {
          accumulator.totalRegular++
          if (pokemon.caught) {
            accumulator.caughtRegular++
          }
        }
        return accumulator
      }, accumulator)
    },
    {
      caughtRegular: 0,
      totalRegular: 0,
      caughtShiny: 0,
      totalShiny: 0,
    }
  )

  return {
    ...dex,
    ...counters,
  }
}

export const canCreateMoreDexes = (dexes: DexList | null): boolean => {
  if (dexes === null) {
    return true
  }
  return getAvailableGames(dexes).length > 0
}

export const getAvailableGames = (dexes: DexList): GameId[] => {
  const usableGameSets = getAvailableGameSets(dexes)
  return SUPPORTED_GAMES.filter(gameId => {
    const gameSet = getGameSet(gameId)
    return usableGameSets.includes(gameSet?.id)
  })
}

export const getUsedGameSets = (dexes: DexList): GameSetId[] => {
  const gameSets: GameSetId[] = []
  dexes.forEach(dex => {
    if (dex.gameSetId && !gameSets.includes(dex.gameSetId)) {
      gameSets.push(dex.gameSetId)
    }
  })
  return gameSets
}

export const getAvailableGameSets = (dexes: DexList): GameSetId[] => {
  const usedGameSets = getUsedGameSets(dexes)
  return SUPPORTED_GAME_SETS.filter(gameSetId => {
    return !usedGameSets.includes(gameSetId)
  })
}

export const loadPresets = async (): Promise<PresetDexMap> => {
  //return await import(`./dummy-box-presets.json`).then(module => module.default)
  return await import('#/data/builds/box-presets-full.min.json').then(module => module.default)
}

const _pidToDexPokemon = (
  boxTitle: string,
  pid: PresetDexPokemon,
  shiny: boolean = false
): DexPokemon => {
  if (typeof pid === 'string') {
    const pkmEntry = getPokemonEntry(pid)
    return {
      pid: pid,
      caught: false,
      shiny: shiny,
      shinyLocked: isShinyLocked(pid),
      shinyBase: pkmEntry.shinyBase,
      gmax: false,
      alpha: false,
    }
  }

  const pkmEntry = getPokemonEntry(pid.pid)
  return {
    pid: pid.pid,
    caught: pid.caught === true,
    shiny: shiny || pid.shiny === true,
    shinyLocked: isShinyLocked(pid.pid) || pid.shinyLocked === true,
    shinyBase: pkmEntry.shinyBase,
    gmax: pid.gmax === true,
    alpha: pid.alpha === true,
  }
}

const _normalizePresetBoxes = (gameId: GameId, preset: PresetDex): PresetDexBox[] => {
  const gameSet = getGameSet(gameId)
  const maxBoxes = gameSet.storage?.boxes || 0
  let boxes = preset.boxes
  if (maxBoxes <= 1) {
    // join all pokemon in a single box
    return [
      {
        pokemon: preset.boxes.reduce(
          (acc, box) => acc.concat(box.pokemon),
          [] as NullablePresetDexPokemon[]
        ),
      },
    ]
  }
  return boxes
}

export const generateDexFromPreset = (
  gameId: GameId,
  preset: PresetDex,
  userId: string | undefined
): Dex => {
  const game = getGame(gameId)
  const timestamp = getUtcTimestamp()
  let totalRegular = 0
  let totalShiny = 0

  // TODO exclude pokemon that cannot be shiny (e.g. Cap Pikachus) - we need a list of all of them
  //    Mark them as "disabled" when generating the component if box.shiny=true but pkm.shiny=false
  const generateBoxes = (shiny: boolean): DexBox[] => {
    const initialIndex = shiny ? preset.boxes.length : 0
    let boxes = _normalizePresetBoxes(gameId, preset)
    return boxes.map((box, index) => ({
      title: getBoxTitle(preset.gameSet as GameSetId, box.title, index + 1 + initialIndex),
      shiny: shiny,
      pokemon: box.pokemon.map(pokemon => {
        if (pokemon === null) {
          return null
        }
        shiny ? totalShiny++ : totalRegular++
        return _pidToDexPokemon(box.title || '', pokemon, shiny)
      }),
    }))
  }

  const nonShinyBoxes = generateBoxes(false)
  const allBoxes = nonShinyBoxes.concat(generateBoxes(true))

  let dex: Dex = {
    id: null,
    userId: userId,
    createdAt: timestamp,
    updatedAt: timestamp,

    title: game.name + ' - Living Dex',
    schemaVersion: DEX_SCHEMA_VERSION,
    gameId: game.id,
    gameSetId: game.setId,
    presetId: preset.id,
    presetVersion: preset.version,
    caughtRegular: 0,
    totalRegular: 0,
    caughtShiny: 0,
    totalShiny: 0,
    boxes: allBoxes,
    lostPokemon: [],
  }

  dex.totalRegular = totalRegular
  dex.totalShiny = totalShiny

  return dex
}

// Renames to support migrations of pokemon IDs
const pokemonIdRenamesVerLessThan3: { [key: string]: string } = {
  'greninja-battle-bond': 'greninja--battle-bond',
  'zygarde-power-construct': 'zygarde--power-construct',
  'zygarde-10-power-construct': 'zygarde-10--power-construct',
  'rockruff-own-tempo': 'rockruff--own-tempo',
  vivillon: 'vivillon-meadow',
  'vivillon-icy-snow': 'vivillon',
}

// TODO: add cap-pikachus (to include -cap at the end)

const _normalizePokemonListToStorable = (
  storedPokemonList: NullableStorableDexPokemon[],
  schemaVersion: number
): NullableStorableDexPokemon[] => {
  return storedPokemonList.map(pkm => {
    const rawPkm = pkm as any
    if (pkm === null) return null

    if (schemaVersion < 3) {
      // Fixes for legacy schemas
      if (pokemonIdRenamesVerLessThan3[pkm.pid]) {
        pkm.pid = pokemonIdRenamesVerLessThan3[pkm.pid]
      } else if (rawPkm.abilityType === 'special' && rawPkm.ability) {
        pkm.pid = `${pkm.pid}--${rawPkm.ability}`
      }
    }

    return {
      pid: pkm.pid,
      caught: pkm.caught && isCatchable(pkm),
      shiny: pkm.shiny,
      gmax: pkm.gmax,
      alpha: pkm.alpha,
    }
  })
}

const _normalizePokemonList = (
  storedPokemonList: NullableStorableDexPokemon[],
  schemaVersion: number
): NullableDexPokemon[] => {
  return _normalizePokemonListToStorable(storedPokemonList, schemaVersion).map(
    (pkm: NullableStorableDexPokemon) => {
      if (pkm === null) return null

      const pkmEntry = getPokemonEntry(pkm.pid)

      return {
        pid: pkm.pid,
        caught: pkm.caught,
        shiny: pkm.shiny,
        shinyLocked: isShinyLocked(pkm.pid),
        shinyBase: pkmEntry.shinyBase,
        gmax: pkm.gmax,
        alpha: pkm.alpha,
      }
    }
  )
}

export const documentToDex = (doc: RawUserOwnedDocument): Dex => {
  const boxes: DexBox[] | StorableDexBox[] = doc.boxes || []

  let game: GameId = defaultGame
  let gameSet: GameSetId = defaultGameSet
  let preset = defaultPreset
  let presetVersion = defaultPresetVersion

  if (doc.game) {
    // legacy support
    game = doc.game as GameId
    if (game === 'home') {
      preset = 'grouped-region'
      gameSet = 'home'
    }
  }

  if (doc.preset && Array.isArray(doc.preset)) {
    // uses new preset field
    if (doc.preset.length === 3) {
      // uses beta preset field
      ;[game, preset, presetVersion] = doc.preset as [GameId, string, number]
      gameSet = getGameSet(game).id
    }
    if (doc.preset.length === 4) {
      // uses final preset field
      ;[gameSet, game, preset, presetVersion] = doc.preset as [GameSetId, GameId, string, number]
    }
  }

  const schemaVersion = doc.sver || 0

  return {
    id: doc.id,
    userId: doc.userId,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,

    title: doc.title,
    schemaVersion: schemaVersion,
    gameId: game,
    gameSetId: gameSet,
    presetId: preset,
    presetVersion: presetVersion,

    // counters will be recalculated
    caughtRegular: -1,
    totalRegular: -1,
    caughtShiny: -1,
    totalShiny: -1,

    boxes: boxes.map(box => {
      return {
        title: '', // title will be replaced with preset name
        pokemon: _normalizePokemonList(box.pokemon, schemaVersion),
        shiny: box.shiny || false,
      }
    }),
    lostPokemon: [],
  }
}

export const dexToDocument = (dex: Dex): StorableDex => {
  return {
    id: dex.id,
    userId: dex.userId,

    title: dex.title,
    sver: DEX_SCHEMA_VERSION,
    preset: [dex.gameSetId, dex.gameId, dex.presetId, dex.presetVersion],
    caught: [dex.caughtRegular, dex.totalRegular],
    caughtShiny: [dex.caughtShiny, dex.totalShiny],

    boxes: dex.boxes.map(box => ({
      pokemon: _normalizePokemonListToStorable(box.pokemon, DEX_SCHEMA_VERSION),
      shiny: box.shiny,
    })),

    createdAt: dex.createdAt,
    updatedAt: dex.updatedAt,
  }
}

export const normalizeDexWithPreset = (oldDex: Dex, preset: PresetDex): Dex => {
  const matchBoxes = (
    asShiny: boolean,
    oldBoxes: DexBox[],
    presetBoxes: PresetDexBox[]
  ): [DexBox[], DexBox] => {
    // Collect all the pokemon
    const pkmHashMap: { [key: string]: (DexPokemon | null)[] } = {}
    oldBoxes.map(box => {
      box.pokemon.map(pokemon => {
        if (pokemon === null || pokemon.shiny !== asShiny) {
          return
        }
        if (pkmHashMap[pokemon.pid] === undefined) {
          pkmHashMap[pokemon.pid] = []
        }
        pkmHashMap[pokemon.pid].push(pokemon)
      })
    })

    const initialBoxIndex = asShiny ? presetBoxes.length : 0

    const newBoxes = presetBoxes.map((box, boxIndex) => ({
      title: getBoxTitle(preset.gameSet as GameSetId, box.title, boxIndex + 1 + initialBoxIndex),
      shiny: asShiny,
      pokemon: box.pokemon.map(pokemon => {
        if (pokemon === null) {
          return null
        }
        let pid, caught, shiny, shinyLocked, gmax, alpha

        if (typeof pokemon === 'object') {
          pid = pokemon.pid
          caught = pokemon.caught === true
          shiny = pokemon.shiny === true
          shinyLocked = pokemon.shinyLocked === true
          gmax = pokemon.gmax === true
          alpha = pokemon.alpha === true
        } else {
          pid = pokemon
          caught = false
          shiny = false
          shinyLocked = false
          gmax = false
          alpha = false
        }

        const oldPokemonSet = pkmHashMap[pid]
        if (oldPokemonSet === undefined || oldPokemonSet === null || oldPokemonSet.length === 0) {
          // this pokemon was not found, add new entry
          return _pidToDexPokemon(box.title || '', pokemon, asShiny || shiny)
        }

        const oldPokemon = oldPokemonSet.shift()
        if (oldPokemon === null || oldPokemon === undefined) {
          throw new Error(
            'Unexpected error: old pokemon was null or undefined in migration hashmap'
          )
        }

        return {
          pid: pid,
          caught: (oldPokemon.caught && isCatchable({ ...oldPokemon, shiny: asShiny })) || caught,
          shiny: asShiny || shiny,
          shinyLocked: isShinyLocked(pid) || shinyLocked,
          shinyBase: getPokemonEntry(pid).shinyBase,
          gmax: oldPokemon.gmax || gmax,
          alpha: oldPokemon.alpha || alpha,
        }
      }),
    }))

    // put remaining Pokemon of hashMap, inside a new box in newBoxes
    const dupesBox: DexBox = {
      title: LEFTOVER_BOX_NAME,
      pokemon: [],
      shiny: asShiny,
    }

    Object.keys(pkmHashMap).map(pid => {
      if (pkmHashMap[pid].length === 0) {
        return
      }
      pkmHashMap[pid].forEach(pokemon => {
        if (pokemon === null) {
          return
        }
        if (!pokemon.caught) {
          // do not need to keep uncaught leftover pokemon
          return
        }
        const pkmEntry = getPokemonEntry(pokemon.pid)
        dupesBox.pokemon.push({
          pid: pokemon.pid,
          caught: true, // at this point, this is always true
          shiny: asShiny,
          shinyLocked: isShinyLocked(pokemon.pid),
          shinyBase: pkmEntry.shinyBase,
          gmax: pokemon.gmax,
          alpha: pokemon.alpha,
        })
      })
    })

    if (dupesBox.pokemon.length > 0) {
      debug('These pokemon do not fit in the current dex: ', dupesBox)
    }

    return [newBoxes, dupesBox]
  }

  // Create the new dex
  const newDex = generateDexFromPreset(oldDex.gameId, preset, oldDex.userId)
  newDex.id = oldDex.id // Important!  otherwise we will create duplicated dexes
  newDex.title = oldDex.title
  newDex.createdAt = oldDex.createdAt

  // fully generate all boxes, taking all the available pokemon info from the old one
  const presetBoxes = _normalizePresetBoxes(newDex.gameId, preset)
  const [nonShinyBoxes, nonShinyLost] = matchBoxes(false, oldDex.boxes, presetBoxes)
  const [shinyBoxes, shinyLost] = matchBoxes(true, oldDex.boxes, presetBoxes)
  newDex.boxes = nonShinyBoxes.concat(shinyBoxes)
  newDex.lostPokemon = nonShinyLost.pokemon.concat(shinyLost.pokemon)

  return dexWithRecalculatedCounters(newDex)
}

export const normalizeDocumentToDex = (doc: RawUserOwnedDocument, presets: PresetDexMap): Dex => {
  const dex = documentToDex(doc)
  const preset = getPresetForGameSet(dex.gameSetId, dex.presetId, presets)

  if (preset) {
    return normalizeDexWithPreset(dex, preset)
  }

  // TODO workaround on this
  console.error(`Preset ${dex.presetId} not found for game ${dex.gameId}`)
  return normalizeDexWithPreset(dex, presets['home']['fully-sorted'])
}
