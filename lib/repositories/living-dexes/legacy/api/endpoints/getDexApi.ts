import { isValidID } from '@/lib/repositories/validators'
import { apiErrors, ApiResponse } from '@/lib/utils/types'

import { getLegacyLivingDexRepository } from '../../index'

export const getDexApi = async (id: string): Promise<ApiResponse> => {
  if (!isValidID(id)) {
    return apiErrors.invalidRequest
  }

  const dex = await getLegacyLivingDexRepository().getById(id)

  if (!dex) {
    return apiErrors.notFound
  }

  return {
    statusCode: 200,
    data: dex,
  }
}
