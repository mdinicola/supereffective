import { isDevelopmentEnv } from '@/lib/utils/env'
import { Prisma, PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    if (typeof window !== 'undefined') {
        throw new Error('Prisma is not available on the client side.')
    }

  const logLevels: Prisma.LogLevel[] = isDevelopmentEnv() ? ['warn', 'error'] : ['warn', 'error']

  return new PrismaClient({
    log: logLevels,
  })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const db = globalThis.prisma ?? prismaClientSingleton()

export default db

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma
}
