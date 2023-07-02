export enum PatreonTier {
  Basic = 'Basic',
  Advanced = 'Advanced',
  Pro = 'Pro',
}

export const PATREON_CREATOR_HANDLE = 'supereffective'
export const PATREON_CAMPAIGN_ID = '9272063'
export const PATREON_TIERS = {
  [PatreonTier.Basic]: {
    id: '9094266',
    name: 'Basic',
    level: 1,
  },
  [PatreonTier.Advanced]: {
    id: '9094285',
    name: 'Advanced',
    level: 2,
  },
  [PatreonTier.Pro]: {
    id: '9094357',
    name: 'Pro',
    level: 3,
  },
}

export const PATREON_TIER_IDS = Object.values(PATREON_TIERS).map(tier => tier.id)
