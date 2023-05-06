import { getFirebaseUserByUid } from '@pkg/auth/lib//serverside/firebase/getFirebaseUserByUid'
import { AuthUser, AuthUserState } from '@pkg/auth/lib/types'
import { Prisma } from '@pkg/database/lib/types'
import { getPrismaClient } from '@pkg/database/prisma/getPrismaClient'
import { getLegacyLivingDexRepository } from '@pkg/database/repositories/living-dexes/legacy'
import { LoadedDex } from '@pkg/database/repositories/living-dexes/legacy/types'
import { getFirebaseAccountById as getPrismaFirebaseAccountById } from '@pkg/database/repositories/users/getUser'

import { devLog } from '#/utils/logger'

import { loadedDexToDex } from '../../../../database/lib/dex-parser/support'

export const migrateFirebaseUserIfNotDone = async (
  session: AuthUserState | null,
  firebaseUserId: string
): Promise<boolean> => {
  if (!session?.currentUser?.email) {
    devLog('[migrateFirebaseUserIfNotDone]: next-auth user is not logged in')
    return false
  }

  if (!session.isOperable()) {
    devLog('[migrateFirebaseUserIfNotDone]: next-auth user is not operable')
    return false
  }

  const linkedFirebaseAccount = await getPrismaFirebaseAccountById(firebaseUserId)

  // already linked
  if (linkedFirebaseAccount) {
    if (linkedFirebaseAccount.userId !== session.currentUser.uid) {
      console.error('[migrateFirebaseUserIfNotDone]: firebase account is linked to another user', {
        firebaseUserId,
        expectedUserId: session.currentUser.uid,
      })
      return false
    }
    devLog('[migrateFirebaseUserIfNotDone]: already linked to firebase account')
    return false
  }

  // not linked yet
  const firebaseUser = await getFirebaseUserByUid(firebaseUserId)
  if (!firebaseUser) {
    devLog('[migrateFirebaseUserIfNotDone]: firebase user not found')
    return false
  }

  devLog('[migrateFirebaseUserIfNotDone]: migrating firebase user')
  await migrateFirebaseUser(firebaseUser, session.currentUser)

  return true
}

export const migrateFirebaseUser = async (
  firebaseUser: AuthUser,
  nextUser: AuthUser
): Promise<void> => {
  const prisma = getPrismaClient()

  devLog('[migrateFirebaseUser]', 'Linking Firebase account', firebaseUser.uid)
  await prisma.firebaseAccount.create({
    data: {
      id: firebaseUser.uid,
      userId: nextUser.uid,
      email: firebaseUser.email,
      emailVerified: firebaseUser.emailVerified,
      displayName: firebaseUser.displayName,
      photoUrl: firebaseUser.photoUrl,
      providerId: firebaseUser.providerId,
      creationTime: firebaseUser.createdAt || new Date(),
      lastRefreshTime: firebaseUser.lastActivityAt || new Date(),
      lastSignInTime: firebaseUser.lastSignInAt || new Date(),
    },
  })

  const dexes = await getLegacyLivingDexRepository().getManyByUserFromFirebase(firebaseUser.uid)

  devLog(
    '[migrateFirebaseUser]',
    'Creating dexes',
    dexes.map(dex => dex.id)
  )

  await prisma.livingDex.createMany({
    data: dexes
      .map((dex: LoadedDex): LoadedDex => {
        dex.userId = nextUser.uid
        return dex
      })
      .map((dex: LoadedDex): Prisma.LivingDexCreateManyInput => {
        const newDex = loadedDexToDex(nextUser.uid, dex)

        return {
          id: dex.id as string,
          creationTime: newDex.creationTime,
          lastUpdateTime: newDex.lastUpdateTime,
          specVer: newDex.specVer,
          data: newDex.data,
          gameId: newDex.gameId,
          title: newDex.title,
          userId: nextUser.uid,
          firebaseAccountId: firebaseUser.uid,
        }
      }),
  })

  devLog('[migrateFirebaseUser]', 'Updating user data', nextUser.uid)
  await prisma.user.update({
    where: {
      id: nextUser.uid,
    },
    data: {
      image: nextUser.photoUrl || firebaseUser.photoUrl,
      displayName: nextUser.displayName || firebaseUser.displayName,
    },
  })
}
