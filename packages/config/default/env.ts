import { z } from 'zod'

import { isClientSide } from '@pkg/utils/lib/env'

const CLIENT_ENV_PREFIX = 'NEXT_PUBLIC_'

type EnvVars = Record<string, string | undefined>

function parseEnvVars<T extends EnvVars>(
  envVars: EnvVars,
  schema: {
    server: Record<string, z.ZodType>
    client: Record<string, z.ZodType>
  }
): T {
  const serverSchema = z.object(schema.server)
  const clientSchema = z.object(schema.client)

  // avoid exposing server env vars in the client
  const parsed = isClientSide()
    ? serverSchema.partial().merge(clientSchema).safeParse(envVars)
    : serverSchema.merge(clientSchema).safeParse(envVars)

  if (!parsed.success) {
    console.error(
      '❌ Invalid environment variables:',
      JSON.stringify(parsed.error.flatten().fieldErrors)
    )
    throw new Error('Invalid environment variables')
  }

  return new Proxy<T>(parsed.data as T, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined

      if (isClientSide() && !prop.startsWith(CLIENT_ENV_PREFIX)) {
        throw new Error(`❌ Cannot use server env vars in the client: ${prop}`)
      }

      return target[prop as keyof typeof target]
    },
  })
}

export const envVars = parseEnvVars(
  {
    // vercel
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    // next auth
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL,
    // email
    EMAIL_SMTP_USER: process.env.EMAIL_SMTP_USER,
    EMAIL_SMTP_PASSWORD: process.env.EMAIL_SMTP_PASSWORD,
    EMAIL_SMTP_HOST: process.env.EMAIL_SMTP_HOST,
    EMAIL_SMTP_PORT: process.env.EMAIL_SMTP_PORT,
    EMAIL_SMTP_ADDRESS: process.env.EMAIL_SMTP_ADDRESS,
    EMAIL_SMTP_ADDRESS_TEST: process.env.EMAIL_SMTP_ADDRESS_TEST,
    // databases
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_DATABASE_URL: process.env.DIRECT_DATABASE_URL,
    SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,
    // firebase
    FIREBASE_ADMINSDK_JSON: process.env.FIREBASE_ADMINSDK_JSON,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,

    // patreon
    PATREON_CLIENT_ID: process.env.PATREON_CLIENT_ID,
    PATREON_CREATOR_ACCESS_TOKEN: process.env.PATREON_CREATOR_ACCESS_TOKEN,
    PATREON_CREATOR_REFRESH_TOKEN: process.env.PATREON_CREATOR_REFRESH_TOKEN,
    PATREON_WEBHOOK_SECRET: process.env.PATREON_WEBHOOK_SECRET,
    NEXT_PUBLIC_PATREON_CLIENT_ID: process.env.NEXT_PUBLIC_PATREON_CLIENT_ID,
  },
  {
    server: {
      // vercel
      VERCEL_ENV: z.string(),
      VERCEL_URL: z.string(), // does not have http[s]:// prefix, so cannot validate as .url()
      // next auth
      NEXTAUTH_SECRET: z.string(),
      NEXTAUTH_URL: z.string().url().optional(),
      NEXTAUTH_URL_INTERNAL: z.string().url().optional(),
      // email
      EMAIL_SMTP_USER: z.string(),
      EMAIL_SMTP_PASSWORD: z.string(),
      EMAIL_SMTP_HOST: z.string(),
      EMAIL_SMTP_PORT: z.string(),
      EMAIL_SMTP_ADDRESS: z.string().email(),
      EMAIL_SMTP_ADDRESS_TEST: z.string().email(),
      // databases
      DATABASE_URL: z.string().url(),
      DIRECT_DATABASE_URL: z.string().url(),
      SHADOW_DATABASE_URL: z.string().url(),
      // firebase
      FIREBASE_ADMINSDK_JSON: z.string(),
      FIREBASE_DATABASE_URL: z.string().url(),

      // patreon
      PATREON_CLIENT_ID: z.string(),
      PATREON_CREATOR_ACCESS_TOKEN: z.string(),
      PATREON_CREATOR_REFRESH_TOKEN: z.string(),
      PATREON_WEBHOOK_SECRET: z.string(),
    },
    client: {
      NEXT_PUBLIC_PATREON_CLIENT_ID: z.string(),
    },
  }
)
