import { apiErrors, ApiResponse } from '@/lib/utils/types'
import { isValidIdSchema } from '@/lib/validation/schemas'

import { getLegacyLivingDexRepository } from '../../index'

export const getDexApi = async (dexId: string): Promise<ApiResponse> => {
  if (!isValidIdSchema(dexId)) {
    return apiErrors.invalidRequest
  }

  const dex = await getLegacyLivingDexRepository().getById(dexId)

  if (!dex) {
    return apiErrors.notFound
  }

  return {
    statusCode: 200,
    data: dex,
  }
}
