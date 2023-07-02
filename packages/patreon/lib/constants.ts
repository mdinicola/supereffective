// https://www.patreon.com/portal
// https://docs.patreon.com/?javascript#step-2-making-the-log-in-button
// https://docs.patreon.com/#oauth
// https://docs.patreon.com/#requesting-specific-data

import { PATREON_CAMPAIGN_ID } from './types/campaign'

const patreonOauth2Url = 'https://www.patreon.com/oauth2'
const patreonApiOauth2Url = 'https://www.patreon.com/api/oauth2'

export const PATREON_API_URLS = {
  oauth2: {
    base: patreonOauth2Url,
    authorize: `${patreonOauth2Url}/authorize`, // button url
    token: `${patreonApiOauth2Url}/token`, // create token
    // resources:
    identity: `${patreonApiOauth2Url}/v2/identity`,
    campaigns: `${patreonApiOauth2Url}/v2/campaigns`,
    members: `${patreonApiOauth2Url}/v2/members`,
    // specific campaign:
    siteCampaign: `${patreonApiOauth2Url}/v2/campaigns/${PATREON_CAMPAIGN_ID}`,
    siteCampaignMembers: `${patreonApiOauth2Url}/v2/campaigns/${PATREON_CAMPAIGN_ID}/members`,
  },
}
