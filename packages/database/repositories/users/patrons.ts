import { PATREON_CAMPAIGN_ID, PATREON_TIERS_BY_ID } from '@pkg/patreon/lib/types/campaign'

import { Membership } from '../../lib/types'
import { getPrismaClient } from '../../prisma/getPrismaClient'

export async function getPatreonMembershipByUserId(userId: string): Promise<Membership | null> {
  const client = getPrismaClient()

  const record = await client.membership.findFirst({
    where: {
      userId,
    },
  })

  return record || null
}

export async function getPatreonMembershipByMemberId(
  patreonMemberId: string
): Promise<Membership | null> {
  const client = getPrismaClient()

  const record = await client.membership.findFirst({
    where: {
      patreonMemberId,
    },
  })

  return record || null
}

export async function addPatreonMembership(
  userId: string,
  data: {
    currentTier: string
    patreonUserId: string
    patreonMemberId: string
    patronStatus: string
    totalContributed: number
  }
): Promise<Membership | null> {
  const client = getPrismaClient()
  const tier = PATREON_TIERS_BY_ID[data.currentTier]
  if (!tier) {
    throw new Error(`Invalid tier ${data.currentTier}`)
  }

  const record = await client.membership.create({
    data: {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      currentTier: tier.id,
      highestTier: tier.id,
      rewardMaxDexes: tier.rewards.maxDexes,
      rewardFeaturedStreamer: tier.rewards.featuredStreamer,
      patreonCampaignId: PATREON_CAMPAIGN_ID,
      userId,
    },
  })

  return record
}

export async function updatePatreonMembership(
  userId: string,
  patreonMemberId: string,
  data: {
    currentTier: string
    patronStatus: string
    totalContributed: number
  }
): Promise<number> {
  const client = getPrismaClient()
  const tier = PATREON_TIERS_BY_ID[data.currentTier]
  if (!tier) {
    throw new Error(`Invalid tier ${data.currentTier}`)
  }

  const record = await client.membership.updateMany({
    where: {
      userId,
      patreonMemberId,
    },
    data: {
      ...data,
      updatedAt: new Date(),
      currentTier: tier.id,
      rewardMaxDexes: tier.rewards.maxDexes,
      rewardFeaturedStreamer: tier.rewards.featuredStreamer,
    },
  })

  return record.count
}

export async function removePatreonMembership(
  userId: string,
  patreonMemberId: string | null
): Promise<number> {
  const client = getPrismaClient()

  const result = await client.membership.deleteMany({
    where: {
      userId,
      patreonMemberId,
    },
  })

  return result.count
}
