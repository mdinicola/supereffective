import { apiErrors, ApiResponse } from '@pkg/utils/lib/types'

import { isValidID } from '../../../../../validators'
import { getLegacyLivingDexRepository } from '../../index'

export const getDexesApi = async (userId: string): Promise<ApiResponse> => {
  if (!isValidID(userId)) {
    return apiErrors.invalidRequest
  }

  const dexes = await getLegacyLivingDexRepository().getManyByUser(userId)

  return {
    statusCode: 200,
    data: dexes,
  }
}
