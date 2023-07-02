import { PATREON_CAMPAIGN_ID } from '@pkg/patreon/lib/types/campaign'

import { PatreonMembership } from '../../lib/types'
import { getPrismaClient } from '../../prisma/getPrismaClient'

export async function getPatreonMembershipByUserId(
  userId: string
): Promise<PatreonMembership | null> {
  const client = getPrismaClient()

  const record = await client.patreonMembership.findFirst({
    where: {
      userId,
    },
  })

  return record || null
}

export async function getPatreonMembershipByMemberId(
  patreonMemberId: string
): Promise<PatreonMembership | null> {
  const client = getPrismaClient()

  const record = await client.patreonMembership.findFirst({
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
): Promise<PatreonMembership | null> {
  const client = getPrismaClient()

  const record = await client.patreonMembership.create({
    data: {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      currentTier: data.currentTier,
      highestTier: data.currentTier,
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

  const record = await client.patreonMembership.updateMany({
    where: {
      userId,
      patreonMemberId,
    },
    data: {
      ...data,
      updatedAt: new Date(),
      currentTier: data.currentTier,
    },
  })

  return record.count
}

export async function removePatreonMembership(
  userId: string,
  patreonMemberId: string
): Promise<number> {
  const client = getPrismaClient()

  const result = await client.patreonMembership.deleteMany({
    where: {
      userId,
      patreonMemberId,
    },
  })

  return result.count
}
