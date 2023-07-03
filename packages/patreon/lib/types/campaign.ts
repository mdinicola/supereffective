export enum PatreonTier {
  Basic = 'Basic',
  Advanced = 'Advanced',
  Pro = 'Pro',
}

export type PatreonTierData = {
  id: string
  name: 'Basic' | 'Advanced' | 'Pro'
  level: number
  rewards: {
    maxDexes: number
    featuredStreamer: boolean
  }
}

export const PATREON_CREATOR_HANDLE = 'supereffective'
export const PATREON_CAMPAIGN_ID = '9272063'

export const PATREON_NO_TIER: PatreonTierData = {
  id: '0',
  name: 'Basic',
  level: 0,
  rewards: {
    maxDexes: 5,
    featuredStreamer: false,
  },
}

export const PATREON_TIERS: {
  [key in PatreonTier]: PatreonTierData
} = {
  [PatreonTier.Basic]: {
    id: '9094266',
    name: 'Basic',
    level: 1,
    rewards: {
      maxDexes: 25,
      featuredStreamer: false,
    },
  },
  [PatreonTier.Advanced]: {
    id: '9094285',
    name: 'Advanced',
    level: 2,
    rewards: {
      maxDexes: 50,
      featuredStreamer: false,
    },
  },
  [PatreonTier.Pro]: {
    id: '9094357',
    name: 'Pro',
    level: 3,
    rewards: {
      maxDexes: 100,
      featuredStreamer: true,
    },
  },
}

export const PATREON_TIERS_BY_ID = {
  [PATREON_TIERS[PatreonTier.Basic].id]: PATREON_TIERS[PatreonTier.Basic],
  [PATREON_TIERS[PatreonTier.Advanced].id]: PATREON_TIERS[PatreonTier.Advanced],
  [PATREON_TIERS[PatreonTier.Pro].id]: PATREON_TIERS[PatreonTier.Pro],
}

export const PATREON_TIER_IDS = Object.values(PATREON_TIERS).map(tier => tier.id)
