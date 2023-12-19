import { isValidID } from '@/lib/repositories/validators'
import { apiErrors, ApiResponse } from '@/lib/utils/types'

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
