import { AxiosResponse } from 'axios'

import axiosInstance from './axiosInstance'
import { PATREON_API_URLS } from './constants'
import { PatreonProfileData, PatreonTokenData } from './types'

function _handleResponse<T>(res: Promise<AxiosResponse<any, any>>): Promise<T | undefined> {
  return res
    .then(async res => {
      if (res.status !== 200) {
        console.error('Patreon API call failed', res.config.url, res.data)
        return undefined
      }
      console.log(res.config.url, res.data)
      return res.data
    })
    .catch(err => {
      console.error('Error fetching Patreon access token', err)
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

async function getCurrentUser(accessToken: string): Promise<PatreonProfileData | undefined> {
  const query = {
    include: 'campaign,memberships',
    'fields[user]':
      'about,created,email,first_name,full_name,image_url,last_name,social_connections,thumb_url,url,vanity',
    'fields[campaign]': 'is_monthly,summary',
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
  creatorAccessToken: string,
  campaignId: string
): Promise<any | undefined> {
  const query = {
    include: 'currently_entitled_tiers,user',
    'fields[member]':
      'full_name,is_follower,last_charge_date,last_charge_status,lifetime_support_cents,currently_entitled_amount_cents,patron_status',
    'fields[tier]':
      'amount_cents,created_at,description,discord_role_ids,edited_at,patron_count,published,published_at,requires_shipping,title,url',
  }

  return await _handleResponse(
    axiosInstance.get(`${PATREON_API_URLS.oauth2.campaigns}/${campaignId}/members`, {
      params: new URLSearchParams(query),
      headers: {
        authorization: `Bearer ${creatorAccessToken}`,
        'Content-Type': 'application/json',
      },
    })
  )
}

async function getCampaignMemberById(
  creatorAccessToken: string,
  memberId: string
): Promise<any | undefined> {
  const query = {
    include: 'currently_entitled_tiers,user,campaign',
    'fields[member]':
      'full_name,is_follower,last_charge_date,last_charge_status,lifetime_support_cents,currently_entitled_amount_cents,patron_status',
    'fields[tier]':
      'amount_cents,created_at,description,discord_role_ids,edited_at,patron_count,published,published_at,requires_shipping,title,url',
  }

  return await _handleResponse(
    axiosInstance.get(`${PATREON_API_URLS.oauth2.members}/${memberId}`, {
      params: new URLSearchParams(query),
      headers: {
        authorization: `Bearer ${creatorAccessToken}`,
        'Content-Type': 'application/json',
      },
    })
  )
}

async function findMembership(
  creatorAccessToken: string,
  memberIds: string[],
  campaignId: string
): Promise<any | undefined> {
  const memberships = await Promise.all(
    memberIds.map(async memberId => {
      return await getCampaignMemberById(creatorAccessToken, memberId)
    })
  )

  console.log('PATREON memberships', memberships)
}

const patreonClient = {
  createAccessToken,
  getCurrentUser,
  getCampaignMembers,
  getCampaignMemberById,
  findMembership,
}

export default patreonClient
