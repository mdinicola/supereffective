import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { AuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'

import { envVars } from '@pkg/config/default/env'
import { getPrismaClient } from '@pkg/database/prisma/getPrismaClient'

import sendMagicLinkEmail from '../../mailing/actions/sendMagicLinkEmail'
import { generateRandomToken } from './generateRandomToken'

const authOptions: AuthOptions = {
  session: {
    strategy: 'database',
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    session: async params => {
      params.session.user = params.user
      return Promise.resolve(params.session)
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  pages: {
    signIn: '/login',
    //signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/signin-sent', // (used for check email message)
    //newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  adapter: PrismaAdapter(getPrismaClient() as any),
  providers: [
    EmailProvider({
      server: {
        host: envVars.EMAIL_SMTP_HOST,
        port: parseInt(envVars.EMAIL_SMTP_PORT || '25'),
        auth: {
          user: envVars.EMAIL_SMTP_USER,
          pass: envVars.EMAIL_SMTP_PASSWORD,
        },
      },
      from: envVars.EMAIL_SMTP_ADDRESS,
      sendVerificationRequest: sendMagicLinkEmail,
      generateVerificationToken() {
        return generateRandomToken()
      },
    }),
  ],
}

export default authOptions
