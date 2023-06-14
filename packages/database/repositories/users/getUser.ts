import { FirebaseAccount, User } from '../../lib/types'
import { getPrismaClient } from '../../prisma/getPrismaClient'

export async function getUserByFirebaseId(firebaseId: string): Promise<User | null> {
  const client = getPrismaClient()

  const user = await client.firebaseAccount
    .findFirst({
      where: {
        id: firebaseId,
      },
    })
    ?.user()

  return user || null
}

export async function getFirebaseAccountByUser(userId: string): Promise<FirebaseAccount | null> {
  const client = getPrismaClient()

  const user = await client.firebaseAccount.findFirst({
    where: {
      userId,
    },
  })

  return user || null
}

export async function getFirebaseAccountById(id: string): Promise<FirebaseAccount | null> {
  const client = getPrismaClient()

  const user = await client.firebaseAccount.findUnique({
    where: {
      id,
    },
  })

  return user || null
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const client = getPrismaClient()

  const user = await client.user.findFirst({
    where: {
      email,
    },
  })

  return user || null
}

export async function hasTooManyValidVerificationTokens(
  email: string,
  max: number
): Promise<boolean> {
  const client = getPrismaClient()

  const tokensCount = await client.verificationToken.count({
    where: {
      identifier: email,
      expires: {
        gt: new Date(),
      },
    },
  })

  if (tokensCount > max) {
    console.warn(`User ${email} has too many valid verification tokens: ${tokensCount}`)
    return true
  }

  return false
}
