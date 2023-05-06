import { UserRecord } from '@pkg/firebase/lib/getFirebaseAdmin'

import { AuthUser, OAuthProviderName } from '../types'

export function convertFirebaseUserRecordToAuthUser(user: UserRecord): AuthUser {
  const providerId = user.providerData[0]?.providerId

  if (!providerId) {
    throw new Error('[getFirebaseUserByUid] No providerId found')
  }

  return {
    uid: user.uid,
    emailVerified: false,
    email: user.email || null,
    displayName: user.displayName || null,
    photoUrl: user.photoURL || null,
    providerId: (user.providerData[0]?.providerId as OAuthProviderName) || null,
    userName: null,
    isDisabled: false,
    createdAt: new Date(user.metadata.creationTime),
    lastSignInAt: new Date(user.metadata.lastSignInTime),
    lastActivityAt: new Date(user.metadata.lastRefreshTime || user.metadata.lastSignInTime),
  }
}
