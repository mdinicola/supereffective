import { NextApiRequest, NextApiResponse } from 'next'

import authOptions from '@pkg/auth/lib/serverside/authOptions'
import { createAuthRouter } from '@pkg/auth/lib/serverside/createAuthRouter'

import { devLog } from '#/utils/logger'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  devLog('nextauth_request', {
    req: [req.method + ' ' + req.url, JSON.stringify(req.query), req.body],
  })

  if (typeof req.query.firebaseUserId === 'string' && req.query.firebaseUserId.length > 0) {
    devLog('nextauth_request -> MIGRATION_INFO_OK', req.url)
    const firebaseUserId = req.query.firebaseUserId

    authOptions.callbacks = {
      ...authOptions.callbacks,
      redirect: async ({ url, baseUrl }) => {
        return baseUrl + '/api/users/migrate-user?firebaseUserId=' + firebaseUserId
      },
    }
  }

  return await createAuthRouter(req, res, authOptions)
}

export default handler
