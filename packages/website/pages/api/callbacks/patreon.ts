import { NextApiRequest, NextApiResponse } from 'next'

import { apiGuard } from '@pkg/auth/lib/serverside/apiGuard'
import { getSession } from '@pkg/auth/lib/serverside/getSession'
import { envVars } from '@pkg/config/default/env'
import { Membership } from '@pkg/database/lib/types'
import patreon from '@pkg/patreon/lib/patreonClient'
import { PATREON_TIERS } from '@pkg/patreon/lib/types/campaign'
import { apiErrors } from '@pkg/utils/lib/types'

import config from '#/config'
import { Routes } from '#/config/routes'

import { addPatreonMembership } from '../../../../database/repositories/users/patrons'

const linkPatreonAccount = async (
  res: NextApiResponse,
  userId: string,
  accessToken: string
): Promise<Membership | undefined> => {
  const patron = await patreon.getIdentity(accessToken)

  if (!patron) {
    // something went wrong when using Patreon OAuth API
    res.status(apiErrors.internalServerError.statusCode).json(apiErrors.internalServerError.data)
    return
  }

  const memberData = await patreon.findMembership(envVars.PATREON_CREATOR_ACCESS_TOKEN, patron)

  if (!memberData) {
    return
  }

  const tier = Object.values(PATREON_TIERS).find(
    tier => tier.name === memberData.tier.attributes.title
  )
  if (!tier) {
    console.error(`PATREON_TIERS: tier not found for title "${memberData.tier.attributes.title}"`)
    return
  }

  const record = await addPatreonMembership(userId, {
    currentTier: tier.id,
    patreonMemberId: memberData.membership.id,
    patreonUserId: memberData.user.id,
    patronStatus: memberData.membership.attributes.patron_status,
    totalContributed: memberData.membership.attributes.lifetime_support_cents,
  })

  if (!record) {
    console.error(
      `addPatreonMembership: could not add membership for user ${userId}. Patron data: ${JSON.stringify(
        memberData,
        null,
        2
      )}`
    )
  }

  return record || undefined
}

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

  const oauthTokenData = await patreon.createAccessToken(
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

  const membership = await linkPatreonAccount(res, guard.user.uid, oauthTokenData.access_token)

  console.log('----------------------------------')

  switch (httpMethod) {
    case 'GET': {
      if (membership) {
        console.log(`membership linked: ${JSON.stringify(membership, null, 2)}`)
        res.redirect(Routes.Profile + '?status=ok&provider=patreon&action=link')
        return
      }
      console.log(`membership could not be linked: ${JSON.stringify(membership, null, 2)}`)
      res.redirect(
        Routes.Profile + '?status=error&provider=patreon&action=link&error=no_membership'
      )
      return
      break
    }
  }
}

export default handler
