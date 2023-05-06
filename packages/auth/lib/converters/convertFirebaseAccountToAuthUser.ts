import { FirebaseAccount } from '@pkg/database/lib/types'

import { AuthUser, OAuthProviderName } from '../types'

export function convertFirebaseAccountToAuthUser(account: FirebaseAccount): AuthUser {
  return {
    uid: account.id,
    emailVerified: account.emailVerified || false,
    email: account.email,
    displayName: account.displayName,
    photoUrl: account.photoUrl,
    providerId: (account.providerId as OAuthProviderName) || null,
    userName: null,
    isDisabled: false,
  }
}
