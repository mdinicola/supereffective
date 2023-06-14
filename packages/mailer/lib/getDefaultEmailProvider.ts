import config from '@pkg/config/default'
import { envVars } from '@pkg/config/default/env'

import createNodemailerProvider from './providers/createNodemailerProvider'
import { EmailProvider, EmailSmtpConfig } from './types'

export function getDefaultEmailProvider(): EmailProvider {
  const providerId = config.emailProvider as EmailProvider['id']
  const smtpConfig: EmailSmtpConfig = {
    host: envVars.EMAIL_SMTP_HOST!,
    port: parseInt(envVars.EMAIL_SMTP_PORT || '25'),
    auth: {
      user: envVars.EMAIL_SMTP_USER!,
      pass: envVars.EMAIL_SMTP_PASSWORD!,
    },
  }

  switch (providerId) {
    case 'nodemailer':
      return createNodemailerProvider({
        server: smtpConfig,
        defaultFrom: envVars.EMAIL_SMTP_ADDRESS!,
      })
    default:
      throw new Error(`Unknown email provider: ${providerId}`)
  }
}
