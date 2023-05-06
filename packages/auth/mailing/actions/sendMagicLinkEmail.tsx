import { createTransport } from 'nodemailer'

import { SendVerificationRequestParams } from 'next-auth/providers'

import { envVars } from '@pkg/config/default/env'
import { isDevelopmentEnv } from '@pkg/utils/lib/env'

import { renderHtml, renderText } from '../templates/magic-link.tpl'

if (isDevelopmentEnv()) {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
}

const sendMagicLinkEmail = async (params: SendVerificationRequestParams) => {
  const { identifier, url, provider } = params
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport(provider.server)
  const result = await transport.sendMail({
    to: identifier,
    bcc: isDevelopmentEnv() ? envVars.EMAIL_SMTP_ADDRESS_TEST : undefined,
    from: provider.from,
    subject: `Sign in to SuperEffective.gg`,
    text: renderText(url),
    // TODO: check MJML https://mjml.io to create a better template
    html: renderHtml({
      url,
    }),
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
  }
}

export default sendMagicLinkEmail
