import { SendVerificationRequestParams } from 'next-auth/providers'

import { hasTooManyValidVerificationTokens } from '@pkg/database/repositories/users/getUser'
import { sendMail } from '@pkg/mailer/lib/sendMail'
import { EmailMessage } from '@pkg/mailer/lib/types'

import { renderHtml, renderText } from '../templates/magic-link.tpl'

const maxTokens = 5

const sendMagicLinkEmail = async (params: SendVerificationRequestParams) => {
  const emailAlreadySent = await hasTooManyValidVerificationTokens(params.identifier, maxTokens)
  if (emailAlreadySent) {
    console.error(
      `[NEXT_AUTH] User has already more than ${maxTokens} sign in tokens`,
      params.identifier
    )
    return
  }
  const { identifier, url, token } = params
  const message: EmailMessage = {
    to: identifier,
    // from: 'noreply@supereffective.gg',
    subject: `Sign in to SuperEffective.gg`,
    body: {
      text: renderText(url, token),
      html: renderHtml({
        url: url,
        token: token,
      }),
    },
  }

  const deliveryResult = await sendMail(message)
  if (!deliveryResult.success) {
    throw new Error(`[NEXT_AUTH] Email could not be sent: ${deliveryResult.errorMessage}`)
  }
}

export default sendMagicLinkEmail
