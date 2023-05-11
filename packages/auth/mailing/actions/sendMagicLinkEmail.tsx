// import sgMail from '@sendgrid/mail'

import { createTransport } from 'nodemailer'

import { SendVerificationRequestParams } from 'next-auth/providers'

import { isDevelopmentEnv } from '@pkg/utils/lib/env'

import { hasTooManyValidVerificationTokens } from '../../../database/repositories/users/getUser'
import { renderHtml, renderText } from '../templates/magic-link.tpl'

if (isDevelopmentEnv()) {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
}

const sendMagicLinkEmail = async (params: SendVerificationRequestParams) => {
  const emailAlreadySent = await hasTooManyValidVerificationTokens(params.identifier)
  if (emailAlreadySent) {
    console.warn('[NEXT_AUTH] Email already sent', params.identifier)
    return
  }
  const { identifier, url, provider } = params
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport(provider.server)
  const result = await transport.sendMail({
    to: identifier,
    // bcc: isDevelopmentEnv() ? envVars.EMAIL_SMTP_ADDRESS_TEST : undefined,
    from: 'noreply@supereffective.gg', //provider.from,
    subject: `Sign in to SuperEffective.gg`,
    text: renderText(url),
    // TODO: check MJML https://mjml.io to create a better template
    html: renderHtml({
      url,
    }),
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`[NEXT_AUTH] Email(s) (${failed.join(', ')}) could not be sent`)
  }

  // if (!envVars.SENDGRID_API_KEY) {
  //   throw new Error('Missing SENDGRID_API_KEY env variable')
  // }

  // if (!provider.from) {
  //   throw new Error('Missing NextAuth EmailConfig.provider.from')
  // }

  // sgMail.setApiKey(envVars.SENDGRID_API_KEY)
  // const msg = {
  //   to: identifier, // Change to your recipient
  //   // bcc: isDevelopmentEnv() ? envVars.EMAIL_SMTP_ADDRESS_TEST : undefined,
  //   from: provider.from, // Change to your verified sender
  //   subject: 'Sign in to SuperEffective.gg',
  //   text: renderText(url),
  //   html: renderHtml({ url }),
  // }
  // sgMail
  //   .send(msg)
  //   .then(() => {
  //     console.log('[NEXT_AUTH] Email sent')
  //   })
  //   .catch(error => {
  //     console.error('[NEXT_AUTH] cannot send email: ', error)
  //   })
}

export default sendMagicLinkEmail
