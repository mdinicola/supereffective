import admin from 'firebase-admin'
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'

import { envVars } from '@pkg/config/default/env'
import createMemoizedCallback from '@pkg/utils/lib/caching/createMemoizedCallback'

export { UserRecord } from 'firebase-admin/auth'

export type FirebaseAdminSdk = typeof admin

export const getFirebaseAdmin = createMemoizedCallback((): FirebaseAdminSdk => {
  const serviceAccount = JSON.parse(envVars.FIREBASE_ADMINSDK_JSON || '{}')

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: envVars.FIREBASE_DATABASE_URL,
    })
  }

  return admin
})

export async function verifyIdToken(idToken: string): Promise<DecodedIdToken | null> {
  try {
    return await getFirebaseAdmin().auth().verifyIdToken(idToken)
  } catch (error) {
    console.error('Error verifying ID token:', error)
    return null
  }
}

export async function getUserByUid(uid: string) {
  return await getFirebaseAdmin()
    .auth()
    .getUser(uid)
    .catch(() => null)
}

export async function getUserByEmail(email: string) {
  return await getFirebaseAdmin()
    .auth()
    .getUserByEmail(email)
    .catch(() => null)
}
