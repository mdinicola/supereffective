import { NextApiRequest, NextApiResponse } from 'next'

import { apiGuard } from '@pkg/auth/lib/serverside/apiGuard'
import { getSession } from '@pkg/auth/lib/serverside/getSession'
import { apiErrors } from '@pkg/utils/lib/types'

import { Routes } from '#/config/routes'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const httpMethod = req.method || 'GET'

  if (!['GET', 'POST'].includes(httpMethod)) {
    res.status(apiErrors.notAllowed.statusCode).json(apiErrors.notAllowed.data)
    return
  }

  const session = await getSession(req, res)

  const guard = apiGuard(session)
  if (!guard.allowed) {
    res.redirect(Routes.Login)
    res.status(guard.statusCode).json(guard.data)
    return
  }

  const { code } = req.query

  // const patron = await fetch('https://www.patreon.com/api/oauth2/v2/token', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: new URLSearchParams({
  //     code: code as string,
  //     grant_type: 'authorization_code',
  //     client_id: '9f0e0b0b0b0b0b0b0b0b0b0b0b0b0b0b',
  //     client_secret: '9f0e0b0b0b0b0b0b0b0b0b0b0b0b0b0b',
  //     redirect_uri: 'https://supereffective.app/api/callbacks/patreon',
  //   }),
  // }).then((res) => res.json())

  /**
   * {
    "access_token": <single use token>,
    "refresh_token": <single use token>,
    "expires_in": <token lifetime duration>,
    "scope": <token scopes>,
    "token_type": "Bearer"
}
   */

  switch (httpMethod) {
    case 'GET':
    case 'POST': {
      console.log('req.method', httpMethod)
      console.log('req.headers', req.headers)
      console.log('req.query', req.query)
      console.log('req.body', req.body)
      res.redirect(Routes.Profile + '?patreon=' + (code || 'no_code'))
      return
      break
    }
  }
}

export default handler
