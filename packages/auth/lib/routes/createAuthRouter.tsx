import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'

import { getPrismaClient } from '@pkg/database/lib/prisma/getPrismaClient'

import sendMagicLinkEmail from '../../mailing/actions/sendMagicLinkEmail'

export const createAuthRouter = () => {
  return NextAuth({
    adapter: PrismaAdapter(getPrismaClient()),
    providers: [
      EmailProvider({
        server: {
          host: process.env.EMAIL_SMTP_HOST,
          port: parseInt(process.env.EMAIL_SMTP_PORT as string),
          auth: {
            user: process.env.EMAIL_SMTP_USER,
            pass: process.env.EMAIL_SMTP_PASSWORD,
          },
        },
        from: process.env.EMAIL_SMTP_ADDRESS,
        sendVerificationRequest: sendMagicLinkEmail,
      }),
    ],
    callbacks: {
      session: async params => {
        ;(params.session as any).userId = params.user.id
        // load other data
        return Promise.resolve(params.session)
      },
      async redirect({ url, baseUrl }) {
        //   // Allows relative callback URLs
        //   if (url.startsWith("/")) return `${baseUrl}${url}`
        //   // Allows callback URLs on the same origin
        //   else if (new URL(url).origin === baseUrl) return url
        //   return baseUrl
        return '/about'
      },
    },
    pages: {
      signIn: '/auth/signin',
      //signOut: '/auth/signout',
      error: '/auth/error', // Error code passed in query string as ?error=
      verifyRequest: '/auth/verify-request', // (used for check email message)
      //newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
  })
}
