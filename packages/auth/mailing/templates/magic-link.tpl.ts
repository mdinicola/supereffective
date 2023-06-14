import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { renderTemplate } from '../templateEngine'

interface MagicLinkOptions {
  url: string
  token: string
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const renderHtml = (options: MagicLinkOptions): string => {
  // created with https://my.stripo.email/cabinet/#/template-editor/?projectId=888398&templateId=2037101&type=MY_TEMPLATE
  return renderTemplate('magic-link.html', options)
}

const renderText = (url: string, token: string): string => {
  return `
  Sign in to SuperEffective.gg

  You have requested to sign in to SuperEffective.gg with this email address.

  If you did not request access to our site with this email, you can safely ignore it.

  To sign in, click the link below:

  ${url}

  
  Alternatively, you can copy and paste the following token on the website login page,
  under the option "Sign in with token":

  ${token}
  `
}

export { renderHtml, renderText }
