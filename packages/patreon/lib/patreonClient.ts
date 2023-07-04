import { AxiosResponse } from 'axios'

import axiosInstance from './axiosInstance'
import { PATREON_API_URLS } from './constants'
import { campaignMemberFields, identityFields } from './requestFields'
import { PatreonTokenData } from './types/api'
import { PATREON_CAMPAIGN_ID, PATREON_TIER_IDS } from './types/campaign'
import {
  IdentityResponse,
  MembershipResponse,
  TierResource,
  UserMembershipResourceAggregate,
} from './types/resources'

function _handleResponse<T>(res: Promise<AxiosResponse<any, any>>): Promise<T | undefined> {
  return res
    .then(async res => {
      if (res.status !== 200) {
        console.error(
          'Patreon API call failed with status code HTTP ' + res.status,
          res.config.url,
          res.data
        )
        return undefined
      }
      console.log('Patreon Request Suceeded: ', res.config.url, res.status)
      return res.data
    })
    .catch(err => {
      console.error('Patreon API call failed:', err)
      return undefined
    })
}

async function createAccessToken(
  tokenCode: string | undefined,
  clientId: string,
  clientSecret: string,
  redirectUri: string
): Promise<PatreonTokenData | undefined> {
  if (!tokenCode) {
    return
  }

  return await _handleResponse(
    axiosInstance.post(
      PATREON_API_URLS.oauth2.token,
      new URLSearchParams({
        code: tokenCode,
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      })
    )
  )
}

async function createAccessTokenWithRefreshToken(
  refreshToken: string,
  clientId: string,
  clientSecret: string
): Promise<PatreonTokenData | undefined> {
  /*POST www.patreon.com/api/oauth2/token
    ?grant_type=refresh_token
    &refresh_token=<the user‘s refresh_token>
    &client_id=<your client id>
    &client_secret=<your client secret> */

  return await _handleResponse(
    axiosInstance.post(
      PATREON_API_URLS.oauth2.token,
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      })
    )
  )
}

async function getIdentity(accessToken: string): Promise<IdentityResponse | undefined> {
  const query = {
    ...identityFields,
  }

  return await _handleResponse(
    axiosInstance.get(PATREON_API_URLS.oauth2.identity, {
      params: new URLSearchParams(query),
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
  )
}

async function getCampaignMembers(
  accessTokenOfCreator: string,
  campaignId: string
): Promise<any | undefined> {
  const query = {
    ...campaignMemberFields,
  }

  return await _handleResponse(
    axiosInstance.get(`${PATREON_API_URLS.oauth2.campaigns}/${campaignId}/members`, {
      params: new URLSearchParams(query),
      headers: {
        authorization: `Bearer ${accessTokenOfCreator}`,
        'Content-Type': 'application/json',
      },
    })
  )
}

async function getCampaignMemberById(
  accessTokenOfCreator: string,
  memberId: string
): Promise<MembershipResponse | undefined> {
  const query = {
    ...campaignMemberFields,
  }

  return await _handleResponse(
    axiosInstance.get(`${PATREON_API_URLS.oauth2.members}/${memberId}`, {
      params: new URLSearchParams(query),
      headers: {
        authorization: `Bearer ${accessTokenOfCreator}`,
        'Content-Type': 'application/json',
      },
    })
  )
}

async function findMembership(
  accessTokenOfCreator: string,
  user: IdentityResponse
): Promise<UserMembershipResourceAggregate | undefined> {
  if (!user.data.relationships?.memberships) {
    return
  }

  const memberships: MembershipResponse[] = (
    await Promise.all(
      user.data.relationships.memberships?.data.map(async membership => {
        return await getCampaignMemberById(accessTokenOfCreator, membership.id)
      })
    )
  ).filter((membership): membership is MembershipResponse => membership !== undefined)

  if (memberships.length === 0) {
    console.log('No memberships found')
    return
  }

  const membership = memberships.find(membership => {
    if (!membership.included.length) {
      console.log('Membership has no included resources')
      return false
    }

    return (
      membership.included.some(
        resource => resource.type === 'campaign' && resource.id === PATREON_CAMPAIGN_ID
      ) &&
      membership.included.some(
        resource => resource.type === 'tier' && PATREON_TIER_IDS.includes(resource.id)
      )
    )
  })

  if (!membership) {
    console.log('Memberships do not include a known campaign or tier')
    return
  }

  const tier = membership.included.find(resource => resource.type === 'tier')
  if (!tier) {
    throw new Error('Membership does not have a tier')
  }
  const campaign = membership.included.find(resource => resource.type === 'campaign')
  if (!campaign) {
    throw new Error('Membership does not have a campaign')
  }

  const aggregate: UserMembershipResourceAggregate = {
    user: user.data,
    membership: membership.data,
    campaign,
    tier: tier as TierResource,
  }

  return aggregate
}

const patreonClient = {
  createAccessToken,
  createAccessTokenWithRefreshToken,
  getIdentity,
  getCampaignMembers,
  getCampaignMemberById,
  findMembership,
}

export default patreonClient
