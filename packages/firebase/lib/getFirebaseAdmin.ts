import admin from 'firebase-admin'
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'

import { envVars } from '@pkg/config/default/env'
import createMemoizedCallback from '@pkg/utils/lib/caching/createMemoizedCallback'

export { UserRecord } from 'firebase-admin/auth'

export type FirebaseAdminSdk = typeof admin
export const getFirebaseAdmin = createMemoizedCallback((): FirebaseAdminSdk => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: envVars.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: envVars.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: envVars.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\n/g, '\n'),
      }),
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

export async function getUsersByEmail(email: string) {
  return await getFirebaseAdmin()
    .auth()
    .getUsers([{ email }])
    .catch(e => {
      console.log('getUserByEmail error', e)
      return null
    })
}
