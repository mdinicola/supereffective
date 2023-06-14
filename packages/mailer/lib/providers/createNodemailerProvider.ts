import { createTransport } from 'nodemailer'

import { EmailMessage, EmailProvider, EmailProviderConfig, EmailSenderFactory } from '../types'

const sendMailFactory: EmailSenderFactory = (config: EmailProviderConfig) => {
  return async (message: EmailMessage) => {
    const transport = createTransport(config.server)
    const templateData = message.body.data || {}
    const renderText = () => {
      if (typeof message.body.text === 'function') {
        return message.body.text(templateData)
      }
      return message.body.text
    }
    const renderHtml = () => {
      if (typeof message.body.html === 'function') {
        return message.body.html(templateData)
      }
      return message.body.html
    }

    const result = await transport.sendMail({
      to: message.to,
      from: message.from || config.defaultFrom,
      subject: message.subject,
      cc: message.cc,
      bcc: message.bcc,
      headers: message.headers,
      priority: message.priority,
      text: renderText(),
      html: renderHtml(),
    })

    const errors = result.rejected.concat(result.pending).filter(Boolean)

    return {
      success: !errors.length,
      errorMessage: errors.length ? errors.join(', ') : undefined,
    }
  }
}

const createNodemailerProvider = (config: EmailProviderConfig): EmailProvider => ({
  id: 'smtp',
  config,
  sendMail: sendMailFactory(config),
})

export default createNodemailerProvider
