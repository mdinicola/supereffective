import { apiErrors, ApiResponse } from '@pkg/utils/lib/types'

import { isValidID } from '../../../../../validators'
import { getLegacyLivingDexRepository } from '../../index'
import { getLegacyDexes } from './getLegacyDexesApi'

export const importLegacyDexesApi = async (
  userId: string,
  userEmail: string | null
): Promise<ApiResponse> => {
  const _email = userEmail
  if (!isValidID(userId) || !_email) {
    return apiErrors.invalidRequest
  }

  const legacyDexes = await getLegacyDexes(userId, _email)
  const numImported = await getLegacyLivingDexRepository().import(legacyDexes, userId)

  return {
    statusCode: 201,
    headers: {
      'X-Num-Imported': numImported.toString(),
    },
  }
}
