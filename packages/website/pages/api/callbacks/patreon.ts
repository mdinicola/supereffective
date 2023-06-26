import { NextApiRequest, NextApiResponse } from 'next'

import { apiGuard } from '@pkg/auth/lib/serverside/apiGuard'
import { getSession } from '@pkg/auth/lib/serverside/getSession'
import { envVars } from '@pkg/config/default/env'
import patreonClient from '@pkg/patreon/lib/patreonClient'
import { apiErrors } from '@pkg/utils/lib/types'

import config from '#/config'
import { Routes } from '#/config/routes'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const httpMethod = req.method || 'GET'

  if (!['GET'].includes(httpMethod)) {
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
  if (!code || typeof code !== 'string') {
    // code is empty or not a string
    res.status(apiErrors.invalidRequest.statusCode).json(apiErrors.invalidRequest.data)
    return
  }

  const oauthTokenData = await patreonClient.createAccessToken(
    code,
    envVars.PATREON_CLIENT_ID,
    envVars.PATREON_CLIENT_SECRET,
    config.patreon.oauthRedirectUrl
  )

  if (!oauthTokenData) {
    // code is invalid or something went wrong when using Patreon OAuth API
    res.status(apiErrors.notAuthorized.statusCode).json(apiErrors.notAuthorized.data)
    return
  }

  // console.log('oauthTokenData', oauthTokenData)

  const patron = await patreonClient.getCurrentUser(oauthTokenData.access_token)

  if (!patron) {
    // something went wrong when using Patreon OAuth API
    res.status(apiErrors.internalServerError.statusCode).json(apiErrors.internalServerError.data)
    return
  }

  console.log('PATRON data', patron)

  /*
  example: 
  {
   data: {
     attributes: {
       about: null,
       created: '2023-06-26T17:27:56.000+00:00',
       first_name: 'Super',
       full_name: 'Super Test',
       image_url: 'https://c8.patreon.com/2/200/95758725',
       last_name: 'Test',
       social_connections: [Object],
       thumb_url: 'https://c8.patreon.com/2/200/95758725',
       url: 'https://www.patreon.com/user?u=95758725',
       vanity: null
     },
     id: '95758725',
     relationships: { campaign: [Object], memberships: [Object] },
     type: 'user'
   },
   included: [
     {
       attributes: {},
       id: 'abcfc5e4-b4cc-4b17-b2b3-1c8e3ca01173',
       type: 'member'
     }
   ],
   links: { self: 'https://www.patreon.com/api/oauth2/v2/user/95758725' }
 }
  
  */

  // await patreonClient.findMembership(envVars.PATREON_CREATOR_ACCESS_TOKEN, [], PATREON_CAMPAIGN_ID)

  switch (httpMethod) {
    case 'GET': {
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
