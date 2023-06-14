import { envVars } from '@pkg/config/default/env'

import createNodemailerProvider from './providers/createNodemailerProvider'
import createResendProvider from './providers/createResendProvider'
import { EmailProvider, EmailSmtpConfig } from './types'

export function getDefaultEmailProvider(): EmailProvider {
  const emailProviderId = envVars.EMAIL_PROVIDER as EmailProvider['id']
  const defaultFrom: string = envVars.EMAIL_DEFAULT_FROM!

  switch (emailProviderId) {
    case 'smtp':
      const smtpConfig: EmailSmtpConfig = {
        host: envVars.EMAIL_SMTP_HOST!,
        port: parseInt(envVars.EMAIL_SMTP_PORT || '25'),
        auth: {
          user: envVars.EMAIL_SMTP_USER!,
          pass: envVars.EMAIL_SMTP_PASSWORD!,
        },
      }
      return createNodemailerProvider({
        server: smtpConfig,
        defaultFrom,
      })
    case 'resend':
      return createResendProvider({
        apiKey: envVars.RESEND_API_KEY!,
        defaultFrom,
      })
    default:
      if (!emailProviderId) {
        throw new Error('EMAIL_PROVIDER env var is missing')
      }
      throw new Error(`Unknown email provider: ${emailProviderId}`)
  }
}
