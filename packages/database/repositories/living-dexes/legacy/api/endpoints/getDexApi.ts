import { apiErrors, ApiResponse } from '@pkg/utils/lib/types'

import { isValidID } from '../../../../../validators'
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
