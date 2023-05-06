import { getUserByEmail } from '@pkg/firebase/lib/getFirebaseAdmin'
import { devLogger } from '@pkg/utils/lib/loggers'

import { convertFirebaseUserRecordToAuthUser } from '../../converters/convertFirebaseUserRecordToAuthUser'
import { AuthUser } from '../../types'

export async function getFirebaseUserByEmail(email: string): Promise<AuthUser | null> {
  devLogger.log('getFirebaseUserByEmail', email)

  const user = await getUserByEmail(email)
  if (!user) {
    return null
  }

  return convertFirebaseUserRecordToAuthUser(user)
}
