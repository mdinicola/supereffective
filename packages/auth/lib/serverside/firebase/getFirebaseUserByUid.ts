import { getUserByUid } from '@pkg/firebase/lib/getFirebaseAdmin'
import { devLogger } from '@pkg/utils/lib/loggers'

import { convertFirebaseUserRecordToAuthUser } from '../../converters/convertFirebaseUserRecordToAuthUser'
import { AuthUser } from '../../types'

export async function getFirebaseUserByUid(uid: string): Promise<AuthUser | null> {
  devLogger.log('getFirebaseUserByUid', uid)

  const user = await getUserByUid(uid)
  if (!user) {
    return null
  }

  return convertFirebaseUserRecordToAuthUser(user)
}
