import { Prisma, PrismaClient } from '@prisma/client'

import db from './db'

/**
 * @deprecated use `@/lib/prisma/db` instead
 */
export const getPrismaClient = (): PrismaClient => {
  return db
}

export { Prisma as PrismaTypes }
