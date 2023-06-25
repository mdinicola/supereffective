import { NextApiRequest, NextApiResponse } from 'next'

import { apiGuard } from '@pkg/auth/lib/serverside/apiGuard'
import { getSession } from '@pkg/auth/lib/serverside/getSession'
import { AuthUser } from '@pkg/auth/lib/types'
import { getLegacyDexesApi } from '@pkg/database/repositories/living-dexes/legacy/api/endpoints/getLegacyDexesApi'
import { importLegacyDexesApi } from '@pkg/database/repositories/living-dexes/legacy/api/endpoints/importLegacyDexesApi'
import { isProductionEnv } from '@pkg/utils/lib/env'
import { apiErrors } from '@pkg/utils/lib/types'

import { Routes } from '#/config/routes'

const listHandler = async (user: AuthUser) => {
  return await getLegacyDexesApi(user.uid, user.email)
}

const postHandler = async (user: AuthUser) => {
  return await importLegacyDexesApi(user.uid, user.email)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const httpMethod = req.method || 'GET'

  if (!['GET', 'POST'].includes(httpMethod)) {
    res.status(apiErrors.notAllowed.statusCode).json(apiErrors.notAllowed.data)
    return
  }

  const session = await getSession(req, res)

  const guard = apiGuard(session)
  if (!guard.allowed) {
    res.status(guard.statusCode).json({ message: guard.data })
    return
  }

  switch (httpMethod) {
    case 'GET': {
      const result = await listHandler(guard.user)
      Object.entries(result.headers || {}).forEach(([key, value]) => {
        res.setHeader(key, value)
      })
      res.status(result.statusCode).json(result.data)
      break
    }
    case 'POST': {
      try {
        const result = await postHandler(guard.user)
        Object.entries(result.headers || {}).forEach(([key, value]) => {
          res.setHeader(key, value)
        })
        res.redirect(301, Routes.LivingDex + '?imported=success')
      } catch (error) {
        console.error(`Failed to import legacy dexes for ${guard.user.email}: ${error}`)

        if (!isProductionEnv()) {
          res.redirect(
            301,
            '/error?error=' + encodeURIComponent(String(error || '') || 'Unknown error')
          )
        } else {
          res.redirect(
            301,
            '/error?error=' + encodeURIComponent('Failed to import your old living dexes')
          )
        }
        return
      }
      break
    }
  }
}

export default handler
