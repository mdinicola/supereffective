import getFirestoreDb from '@pkg/firebase/lib/getFirestoreDb'
import createMemoizedCallback from '@pkg/utils/lib/caching/createMemoizedCallback'

import { getGameSetByGameId } from '../../game-sets'
import { GameSetId } from '../../game-sets/ids'
import { GameId } from '../../games/ids'
import { getPokemonEntry, isShinyLocked } from '../../pokemon'
import { convertLoadedDexToStorableDex } from './converters/convertLoadedDexToStorableDex'
import { convertPokemonListToStorable } from './converters/convertPokemonListToStorable'
import { getAvailableGames } from './gameAvailability'
import { getPresetByIdForGameSet, getPresets } from './presets'
import { normalizeDexWithPreset } from './presets/normalizeDexWithPreset'
import {
  DexBox,
  DexPokemon,
  LivingDexRepository,
  LoadedDex,
  LoadedDexList,
  NullableDexPokemon,
  StorableDex,
} from './types'

const defaultGame = 'home'
const defaultGameSet = 'home'
const defaultPreset = 'fully-sorted'
const defaultPresetVersion = 0

export const isCatchable = (pokemon: DexPokemon): boolean => {
  return !(pokemon.shiny && isShinyLocked(pokemon.pid))
}

export const getLivingDexRepository = createMemoizedCallback((): LivingDexRepository => {
  const collectionName = 'dexes'
  const db = getFirestoreDb()

  return {
    getById: async (id: string) => {
      return db.getDocument<StorableDex>(collectionName, id).then(_normalizeDocumentToDex)
    },
    getManyByUser: async (userUid: string, limit = 100) => {
      return db
        .findDocumentsByUser<StorableDex>(collectionName, userUid, {}, ['updatedAt', 'desc'], limit)
        .then(docs => docs.map(_normalizeDocumentToDex))
    },
    canCreateMoreDexes: (dexes: LoadedDexList | null): boolean => {
      if (dexes === null || dexes.length === 0) {
        return true
      }
      return getAvailableGames(dexes).length > 0
    },
    save: async (dex: LoadedDex) => {
      if (!dex.userId) {
        throw new Error('Cannot save dex without userId')
      }
      return db
        .upsertDocument(collectionName, convertLoadedDexToStorableDex(dex), dex.userId)
        .then(dexId => {
          dex.id = dexId
          return dex
        })
    },
    remove: async (id: string) => {
      return db.deleteDocument(collectionName, id)
    },
    isCatchable,
    recalculateCounters: (dex: LoadedDex): LoadedDex => {
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
    },
  }
})

function _normalizeDocumentToDex(doc: StorableDex): LoadedDex {
  const presets = getPresets()
  const dex = _documentToDex(doc)
  const preset = getPresetByIdForGameSet(dex.gameSetId, dex.presetId)

  if (preset) {
    return normalizeDexWithPreset(dex, preset)
  }

  // TODO workaround on this
  console.error(`Preset ${dex.presetId} not found for game ${dex.gameId}`)
  return normalizeDexWithPreset(dex, presets['home']['fully-sorted'])
}

function _documentToDex(doc: StorableDex): LoadedDex {
  const boxes: DexBox[] = doc.boxes || []

  let gameId: GameId = defaultGame
  let gameSetId: GameSetId = defaultGameSet
  let presetId = defaultPreset
  let presetVersion = defaultPresetVersion

  if (doc.game) {
    // legacy support
    gameId = doc.game as GameId
    if (gameId === 'home') {
      presetId = 'grouped-region'
      gameSetId = 'home'
    }
  }

  if (doc.preset && Array.isArray(doc.preset)) {
    // uses new preset field
    if (doc.preset.length === 3) {
      // uses beta preset field
      ;[gameId, presetId, presetVersion] = doc.preset as [GameId, string, number]
      gameSetId = getGameSetByGameId(gameId).id
    }
    if (doc.preset.length === 4) {
      // uses final preset field
      ;[gameSetId, gameId, presetId, presetVersion] = doc.preset as [
        GameSetId,
        GameId,
        string,
        number
      ]
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
    gameId: gameId,
    gameSetId: gameSetId,
    presetId: presetId,
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

function _normalizePokemonList(
  storedPokemonList: NullableDexPokemon[],
  schemaVersion: number
): NullableDexPokemon[] {
  return convertPokemonListToStorable(storedPokemonList, schemaVersion).map(
    (pkm: NullableDexPokemon) => {
      if (pkm === null) return null

      const pkmEntry = getPokemonEntry(pkm.pid)

      return {
        pid: pkm.pid,
        caught: pkm.caught,
        shiny: pkm.shiny,
        shinyLocked: isShinyLocked(pkm.pid),
        shinyBase: pkmEntry.shiny.base,
        gmax: pkm.gmax,
        alpha: pkm.alpha,
      }
    }
  )
}
