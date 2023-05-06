import { NextApiRequest, NextApiResponse } from 'next'

import { apiGuard } from '@pkg/auth/lib/serverside/apiGuard'
import { getSession } from '@pkg/auth/lib/serverside/getSession'
import { AuthUserState } from '@pkg/auth/lib/types'
import { apiErrors } from '@pkg/utils/lib/types'

import { Routes } from '#/config/routes'
import { migrateFirebaseUserIfNotDone } from '#/features/users/migrateFirebaseUser'
import { devLog } from '#/utils/logger'

const GET_handler = async (
  session: AuthUserState | null,
  firebaseUserId: string,
  res: NextApiResponse
) => {
  const migrated = await migrateFirebaseUserIfNotDone(session, firebaseUserId)

  if (migrated) {
    res.redirect(Routes.Profile + '?welcome=1')
    return
  }
  res.redirect(Routes.Profile + '?ref=migrations')
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  devLog('[migrate-user] entered', req.query)
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

  const firebaseUserId = req.query.firebaseUserId

  if (!firebaseUserId || typeof firebaseUserId !== 'string' || firebaseUserId.length === 0) {
    res.status(400).json({ message: 'firebaseUserId param is required' })
  }

  switch (httpMethod) {
    case 'GET': {
      await GET_handler(session, firebaseUserId as string, res)
      break
    }
  }
}

export default handler
