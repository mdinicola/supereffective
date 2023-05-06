import { verifyIdToken } from '@pkg/firebase/lib/getFirebaseAdmin'
import { devLogger } from '@pkg/utils/lib/loggers'

import { AuthUser } from '../../types'
import { getFirebaseUserByUid } from './getFirebaseUserByUid'

export async function getFirebaseUserByToken(sessionToken: string): Promise<AuthUser | null> {
  devLogger.log('getFirebaseUserByToken', sessionToken)
  const decodedToken = await verifyIdToken(sessionToken)

  if (!decodedToken) {
    return null
  }

  return await getFirebaseUserByUid(decodedToken.uid)
}
