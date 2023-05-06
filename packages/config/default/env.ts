import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const envVars = createEnv({
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
  },
  // client-side only
  client: {},
  runtimeEnv: process.env as any, // or `import.meta.env`, or similar
})
