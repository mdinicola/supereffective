export type PatreonTokenData = {
  access_token: string
  refresh_token: string
  expires_in: number
  scope: string
  token_type: 'Bearer'
}

export type PatreonProfileData = {
  id: string
  type: 'user'
  relationships: {
    pledges: {
      data: []
    }
  }
  data: {
    attributes: {
      email: string
      first_name: string
      full_name: string
      last_name: string
      image_url: string
      thumb_url: string
      url: string
    }
  }
}

export type PatreonCampaignData = {
  id: string
  type: 'campaign'
}
