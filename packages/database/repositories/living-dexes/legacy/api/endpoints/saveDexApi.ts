import { jsonDecode } from '@pkg/utils/lib/serialization/jsonSerializable'
import { apiErrors, ApiResponse } from '@pkg/utils/lib/types'

import { isValidID } from '../../../../../validators'
import { hasUsedGame, hasUsedGameSet } from '../../gameAvailability'
import { getLegacyLivingDexRepository } from '../../index'
import { LoadedDex } from '../../types'
import { LoadedDexSchema } from '../../validators'

function _validDex(dex: LoadedDex): boolean {
  return LoadedDexSchema.safeParse(dex).success
}

function _canCreateMoreDexes(dexes: LoadedDex[], dex: LoadedDex): boolean {
  if (hasUsedGame(dexes, dex.gameId) || hasUsedGameSet(dexes, dex.gameSetId)) {
    return false
  }
  return true
}

export const saveDexApi = async (
  data: string | undefined | null,
  currentUserId: string
): Promise<ApiResponse> => {
  const dex: LoadedDex = jsonDecode(data || '{}')

  if (!isValidID(currentUserId) || !_validDex(dex)) {
    return apiErrors.invalidRequest
  }

  const userDexes = await getLegacyLivingDexRepository().getManyByUser(currentUserId)
  const isNew = dex.id === undefined || dex.id === null

  if (isNew && !_canCreateMoreDexes(userDexes, dex)) {
    return {
      statusCode: 400,
      data: {
        message: 'You already have a game for this game set',
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
