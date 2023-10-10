import { jsonDecode } from '@pkg/utils/lib/serialization/jsonSerializable'
import { apiErrors, ApiResponse } from '@pkg/utils/lib/types'

import { isValidID } from '../../../../../validators'
import { _pokemonIds } from '../../../../pokemon/ids'
import { getLegacyLivingDexRepository } from '../../index'
import { LoadedDex } from '../../types'
import { LoadedDexSchema } from '../../validators'

async function _canCreateMoreDexes(dexes: LoadedDex[], currentUserId: string): Promise<boolean> {
  const limits = await getLegacyLivingDexRepository().getLimitsForUser(currentUserId)
  return dexes.length < limits.maxDexes
}

const validPokemonIds = _pokemonIds

function sanitizeDex(dex: LoadedDex): LoadedDex {
  for (const i in dex.boxes) {
    const box = dex.boxes[i]
    const sanitizedPokemon = []
    for (const j in box.pokemon) {
      const pkm = box.pokemon[j]
      if (pkm !== null && !validPokemonIds.includes(pkm.pid)) {
        continue
      }
      sanitizedPokemon.push(pkm)
    }
    dex.boxes[i].pokemon = sanitizedPokemon
  }

  return {
    ...dex,
    userId: undefined,
  }
}

export const saveDexApi = async (
  data: string | undefined | null,
  currentUserId: string
): Promise<ApiResponse> => {
  const dex: LoadedDex = sanitizeDex(jsonDecode(data || '{}'))
  const validation = LoadedDexSchema.safeParse(dex)

  if (!isValidID(currentUserId)) {
    return apiErrors.notAuthorized
  }

  if (!validation.success) {
    return {
      statusCode: 400,
      data: {
        message: validation.error.message,
      },
    }
  }

  const userDexes = await getLegacyLivingDexRepository().getManyByUser(currentUserId)
  const isNew = dex.id === undefined || dex.id === null

  if (isNew && !_canCreateMoreDexes(userDexes, currentUserId)) {
    return {
      statusCode: 400,
      data: {
        message:
          'You cannot create more dexes with your current Tier, please support us via Patreon.',
      },
    }
  }

  const isOwner = dex.userId === currentUserId

  if (dex.userId !== undefined && !isOwner) {
    return apiErrors.notAuthorized
  }

  const savedDex = await getLegacyLivingDexRepository().save(dex, currentUserId)

  return {
    statusCode: 200,
    data: savedDex,
  }
}
