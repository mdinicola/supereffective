import { getUsersByEmail } from '@pkg/firebase/lib/getFirebaseAdmin'
import { apiErrors, ApiResponse } from '@pkg/utils/lib/types'

import { isValidID } from '../../../../../validators'
import { getLegacyLivingDexRepository } from '../../index'
import { LoadedDex } from '../../types'

export const getLegacyDexes = async (userId: string, userEmail: string): Promise<LoadedDex[]> => {
  const currentDexes = await getLegacyLivingDexRepository().getManyByUser(userId)

  const results: LoadedDex[] = []

  const firebaseUsers = await getUsersByEmail(userEmail)
  if (!firebaseUsers) {
    return results
  }

  for (const user of firebaseUsers.users) {
    const firebaseDexes = await getLegacyLivingDexRepository().getManyByUserFromFirebase(user.uid)

    // add firebaseDexes that are not in 'dexes':
    firebaseDexes.forEach(firebaseDex => {
      if (!currentDexes.find(dex => dex.id === firebaseDex.id)) {
        results.push(firebaseDex)
      }
    })
  }

  return results
}

export const getLegacyDexesApi = async (
  userId: string,
  userEmail: string | null
): Promise<ApiResponse> => {
  const _email = userEmail
  if (!isValidID(userId) || !_email) {
    return apiErrors.invalidRequest
  }

  const dexes = await getLegacyDexes(userId, _email)

  console.log('legacy dexes', dexes)

  const resp: ApiResponse = {
    statusCode: 200,
    data: dexes,
  }

  return resp
}
