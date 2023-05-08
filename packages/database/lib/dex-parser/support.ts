import { LivingDex } from '@prisma/client'

import { SerializableDate } from '@pkg/utils/lib/serialization/jsonSerializable'

import { getGameSetByGameId } from '../../repositories/game-sets'
import { GameSetId } from '../../repositories/game-sets/ids'
import { GameId } from '../../repositories/games/ids'
import { convertPokemonListToStorable } from '../../repositories/living-dexes/legacy/converters/convertPokemonListToStorable'
import { getPresetByIdForGameSet, getPresets } from '../../repositories/living-dexes/legacy/presets'
import { normalizeDexWithPreset } from '../../repositories/living-dexes/legacy/presets/normalizeDexWithPreset'
import {
  DexBox,
  LoadedDex,
  NullableDexPokemon,
  StorableDex,
} from '../../repositories/living-dexes/legacy/types'
import { getPokemonEntry, isShinyLocked } from '../../repositories/pokemon'
import { getLivingDexFormat, parseLivingDex, serializeLivingDex } from '../dex-parser'
import {
  DeserializedLivingDexDoc,
  LIVINGDEX_DOC_SPEC_VERSION_LAST,
  LivingDexDocBox,
  LivingDexDocPokemon,
} from './types'

export function convertDexFromLegacyToV4(dex: LoadedDex): DeserializedLivingDexDoc {
  if (!dex.userId) {
    throw new Error(`LoadedDex has no userId`)
  }
  return {
    $id: dex.id,
    creationTime: dex.createdAt?.toISOString() ?? new Date().toISOString(),
    lastUpdateTime: dex.updatedAt?.toISOString() ?? new Date().toISOString(),
    gameId: dex.gameId,
    title: dex.title,
    ownerId: dex.userId,
    format: LIVINGDEX_DOC_SPEC_VERSION_LAST,
    legacyPresetId: dex.presetId,
    legacyPresetVersion: dex.presetVersion,
    boxes: dex.boxes.map(
      (box, i): LivingDexDocBox => ({
        title: box.title ?? `Box ${i + 1}`,
        shiny: box.shiny,
        pokemon: box.pokemon.map((pokemon): LivingDexDocPokemon | null => {
          if (!pokemon) {
            return null
          }

          if (!pokemon.pid) {
            throw new Error(`Pokemon has no id`)
          }

          const emblemMarks = []

          if (pokemon.alpha) {
            emblemMarks.push('alpha')
          }

          if (pokemon.gmax) {
            emblemMarks.push('gmax')
          }

          return {
            id: pokemon.pid,
            captured: pokemon.caught,
            shiny: pokemon.shiny,
            originMark: undefined,
            nature: undefined,
            pokerus: undefined,
            level: undefined,
            dynamaxLevel: undefined,
            teraType: undefined,
            ball: undefined,
            item: undefined,
            language: undefined,
            evs: [],
            ivs: [],
            moves: [],
            emblemMarks: emblemMarks,
          }
        }),
      })
    ),
  }
}

export function convertDexFromV4ToLegacy(dex: DeserializedLivingDexDoc): StorableDex {
  if (!dex.legacyPresetId || !dex.legacyPresetVersion) {
    throw new Error(`Dex has no legacy preset ID or version`)
  }
  return {
    id: dex.$id,
    createdAt: new Date(dex.creationTime),
    updatedAt: new Date(dex.lastUpdateTime),
    userId: dex.ownerId,
    title: dex.title,
    sver: 3,
    preset: [
      getGameSetByGameId(dex.gameId).id,
      dex.gameId,
      dex.legacyPresetId,
      dex.legacyPresetVersion,
    ],
    caught: [0, 0], //  [caught, total]
    caughtShiny: [0, 0],
    boxes: dex.boxes.map(
      (box): DexBox => ({
        title: box.title,
        shiny: box.shiny,
        pokemon: box.pokemon.map((pokemon): NullableDexPokemon => {
          if (!pokemon) {
            return null
          }

          return {
            pid: pokemon.id,
            caught: pokemon.captured,
            shiny: pokemon.shiny,
            alpha: pokemon.emblemMarks.includes('alpha'),
            gmax: pokemon.emblemMarks.includes('gmax'),
          }
        }),
      })
    ),
  }
}

export function dexToLoadedDex(dex: LivingDex): LoadedDex {
  const dataMd = convertDexFromV4ToLegacy(parseLivingDex(dex.data))
  return convertFirebaseStorableDexToLoadedDex(dex.id, dataMd)
}

export function loadedDexToDex(userId: string, loadedDex: LoadedDex): Omit<LivingDex, 'id'> {
  return {
    specVer: LIVINGDEX_DOC_SPEC_VERSION_LAST,
    userId: userId,
    data: serializeLivingDex(
      convertDexFromLegacyToV4(loadedDex),
      getLivingDexFormat(LIVINGDEX_DOC_SPEC_VERSION_LAST),
      false
    ),
    gameId: loadedDex.gameId,
    title: loadedDex.title,
    creationTime: loadedDex.createdAt ?? new Date(),
    lastUpdateTime: loadedDex.updatedAt ?? new Date(),
    firebaseAccountId: null,
  }
}

export function convertFirebaseStorableDexToLoadedDex(id: string, doc: StorableDex): LoadedDex {
  doc.id = id
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

const defaultGame = 'home'
const defaultGameSet = 'home'
const defaultPreset = 'fully-sorted'
const defaultPresetVersion = 0

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
    createdAt: _sanitizeDate(doc.createdAt),
    updatedAt: _sanitizeDate(doc.updatedAt),

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
function _sanitizeDate(date: Date | SerializableDate | string | undefined): Date {
  if (date instanceof Date) {
    return date
  }

  if (typeof date === 'string') {
    return new Date(date)
  }

  if (typeof date === 'object' && date._type && date._type === 'Date' && date._value) {
    return new Date(date._value)
  }

  return new Date()
}

function _normalizePokemonList(
  storedPokemonList: NullableDexPokemon[],
  schemaVersion: number
): NullableDexPokemon[] {
  return convertPokemonListToStorable(storedPokemonList, schemaVersion).map(
    (pkm: NullableDexPokemon) => {
      if (pkm === null) {
        return null
      }

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