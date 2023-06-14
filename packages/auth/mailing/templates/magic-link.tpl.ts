import { renderTemplate } from '../templateEngine'
import templateCode from './magic-link.html'

interface MagicLinkOptions {
  url: string
  token: string
}

const renderHtml = (options: MagicLinkOptions): string => {
  return renderTemplate(templateCode, options)
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
