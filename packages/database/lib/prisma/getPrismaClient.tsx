import { PrismaClient } from '@prisma/client'

import createMemoizedCallback from '@pkg/utils/lib/caching/createMemoizedCallback'

export const getPrismaClient = createMemoizedCallback((): PrismaClient => {
  const prisma = new PrismaClient()
  return prisma
})
