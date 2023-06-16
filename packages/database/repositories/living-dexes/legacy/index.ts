import getFirestoreDb from '@pkg/firebase/lib/getFirestoreDb'
import createMemoizedCallback from '@pkg/utils/lib/caching/createMemoizedCallback'

import {
  convertFirebaseStorableDexToLoadedDex,
  dexToLoadedDex,
  loadedDexToDex,
} from '../../../lib/dex-parser/support'
import { getPrismaClient, PrismaTypes } from '../../../prisma/getPrismaClient'
import { isShinyLocked } from '../../pokemon'
import { getAvailableGames } from './gameAvailability'
import { DexPokemon, LivingDexRepository, LoadedDex, LoadedDexList, StorableDex } from './types'

const DEFAULT_DEX_LIST_LIMIT = 50

export const isCatchable = (pokemon: DexPokemon): boolean => {
  return !(pokemon.shiny && isShinyLocked(pokemon.pid))
}

export function canCreateMoreDexes(dexes: LoadedDexList | null): boolean {
  if (dexes === null || dexes.length === 0) {
    return true
  }
  return getAvailableGames(dexes).length > 0
}

export function recalculateCounters(dex: LoadedDex): LoadedDex {
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

export const getLegacyLivingDexRepository = createMemoizedCallback((): LivingDexRepository => {
  const collectionName = 'dexes'
  const prismaDb = getPrismaClient().livingDex

  const getById = async (id: string) => {
    return prismaDb
      .findFirst({ where: { id } })
      .catch(error => {
        console.error('Error getting dex', error)
        throw error
      })
      .then(dex => {
        if (!dex) {
          return null
        }
        if (typeof dex.data !== 'string') {
          throw new Error(`Invalid dex data for dex ${id}`)
        }

        return dexToLoadedDex(dex)
      })
  }

  return {
    getById,
    getManyByUser: async (userUid: string) => {
      return prismaDb
        .findMany({
          where: { userId: userUid },
          // orderBy: {
          //   lastUpdateTime: 'desc',
          // },
          take: DEFAULT_DEX_LIST_LIMIT,
        })
        .catch(error => {
          console.error('Error getting many dexes', error)
          throw error
        })
        .then(dexes => dexes.map(dex => dexToLoadedDex(dex)))
    },
    getManyByUserFromFirebase: async (userUid: string) => {
      return getFirestoreDb()
        .findDocumentsByUser<StorableDex>(
          collectionName,
          userUid,
          {},
          ['updatedAt', 'desc'],
          DEFAULT_DEX_LIST_LIMIT
        )
        .catch(error => {
          console.error('Error getting many dexes from Firebase', error)
          throw error
        })
        .then(docs => docs.map(doc => convertFirebaseStorableDexToLoadedDex(doc.id || '??', doc)))
    },
    import: async (dexes: LoadedDex[], userId) => {
      const createManyArgs: {
        data: Array<PrismaTypes.LivingDexCreateManyInput>
      } = {
        data: [],
      }
      for (const dex of dexes) {
        dex.userId = userId

        if (!dex.id) {
          throw new Error('Cannot import a dex that has no ID')
        }

        const existingDex = await getById(dex.id)

        if (existingDex) {
          throw new Error(`Dex ${dex.id} already exists`)
        }

        const dexToSave = loadedDexToDex(userId, dex)

        createManyArgs.data.push({
          id: dex.id,
          specVer: dexToSave.specVer,
          userId,
          data: dexToSave.data,
          gameId: dexToSave.gameId,
          title: dexToSave.title,
          creationTime: dexToSave.creationTime,
          lastUpdateTime: dexToSave.lastUpdateTime || new Date(),
        })
      }

      return prismaDb.createMany(createManyArgs).then(result => result.count)
    },
    save: async (dex: LoadedDex, userId) => {
      dex.updatedAt = new Date()
      dex.userId = userId

      const dexToSave = loadedDexToDex(userId, dex)

      if (!dex.id) {
        return prismaDb
          .create({
            data: {
              specVer: dexToSave.specVer,
              userId,
              data: dexToSave.data,
              gameId: dexToSave.gameId,
              title: dexToSave.title,
              creationTime: new Date(),
              lastUpdateTime: dexToSave.lastUpdateTime,
            },
          })
          .then(result => ({ ...dex, id: result.id }))
      }

      return prismaDb
        .update({
          where: { id: dex.id as string },
          data: {
            title: dexToSave.title,
            specVer: dexToSave.specVer,
            data: dexToSave.data,
            lastUpdateTime: dexToSave.lastUpdateTime,
            userId,
          },
        })
        .catch(error => {
          console.error('Error saving dex', error)
          throw error
        })
        .then(result => ({ ...dex, id: result.id }))
    },
    remove: async (id: string) => {
      return prismaDb
        .delete({ where: { id } })
        .catch(error => {
          console.error('Error removing dex', error)
          throw error
        })
        .then(/* void */)
    },
  }
})
