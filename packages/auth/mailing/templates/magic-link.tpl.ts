interface MagicLinkOptions {
  url: string
  color: {
    background: string
    text: string
    mainBackground: string
    buttonBackground: string
    buttonBorder: string
    buttonText: string
  }
}

const renderHtml = (options: MagicLinkOptions): string => {
  const { color, url } = options

  return `
  <body style="background: ${color.background};">
      <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
          <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Sign in to <strong>SuperEffective.gg</strong>
          </td>
      </tr>
      <tr>
          <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
              <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                  in</a></td>
              </tr>
          </table>
          </td>
      </tr>
      <tr>
          <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          If you did not request access to our site with this email, you can safely ignore it.
          </td>
      </tr>
      </table>
  </body>
  `
}

const renderText = (url: string): string => {
  return `Sign in to SuperEffective.gg: \n${url}\n\n`
}

export { renderHtml, renderText }
