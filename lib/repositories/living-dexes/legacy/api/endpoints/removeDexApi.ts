import { apiErrors, ApiResponse } from '@/lib/utils/types'

import { isValidID } from '@/lib/repositories/validators'
import { getLegacyLivingDexRepository } from '../../index'
import { LoadedDex } from '../../types'
import { getDexApi } from './getDexApi'

export const removeDexApi = async (id: string, currentUserId: string): Promise<ApiResponse> => {
  if (!isValidID(id) || !isValidID(currentUserId)) {
    return apiErrors.invalidRequest
  }

  const resp = await getDexApi(id)

  if (resp.statusCode !== 200) {
    return { ...resp, data: [] }
  }

  const isOwner = (resp.data as LoadedDex).userId === currentUserId

  if (!isOwner) {
    return apiErrors.notAuthorized
  }

  await getLegacyLivingDexRepository().remove(id)

  return {
    statusCode: 200,
    data: [id],
  }
}
