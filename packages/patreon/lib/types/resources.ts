export type JsonApiResource = {
  id: string
  type: string
  attributes: {
    [key: string]: any
  }
  relationships?: {
    [key: string]: JsonApiRelationship<string> | JsonApiRelationshipList<string>
  }
}

export type JsonApiRelationship<T extends string> = {
  data: {
    id: string
    type: T
  } | null
}

export type JsonApiRelationshipList<T extends string> = {
  data: Array<{
    id: string
    type: T
  }>
}

export type JsonApiResponse<T extends JsonApiResource, Inc extends Array<JsonApiResource>> = {
  data: T
  included?: Inc
  links?: {
    [key: string]: string
  }
}

export type JsonApiListResponsee<T extends JsonApiResource, Inc extends Array<JsonApiResource>> = {
  data: T[]
  included?: Inc
  links?: {
    [key: string]: string
  }
}

export interface IdentityResource extends JsonApiResource {
  type: 'user'
  attributes: {
    about: string | null
    created: string
    first_name: string
    full_name: string
    image_url: string
    last_name: string
    thumb_url: string
    email?: string
    url: string
    vanity: string | null
  }
  relationships: {
    campaign: JsonApiRelationship<'campaign'>
    memberships: JsonApiRelationshipList<'member'>
  }
}

export interface IdentityResponse
  extends JsonApiResponse<IdentityResource, Array<JsonApiResource>> {
  included: Array<JsonApiResource>
}

export interface MembershipResource extends JsonApiResource {
  type: 'member'
  attributes: {
    currently_entitled_amount_cents: number
    full_name: string
    is_follower: boolean
    last_charge_date: string
    last_charge_status: string
    lifetime_support_cents: number
    patron_status: 'active_patron' | 'declined_patron' | 'former_patron'
  }
  relationships: {
    currently_entitled_tiers: JsonApiRelationshipList<'tier'>
    user: JsonApiRelationship<'user'>
  }
}

export interface MembershipResponse
  extends JsonApiResponse<MembershipResource, Array<JsonApiResource>> {
  included: Array<TierResource | JsonApiResource>
}

export interface TierResource extends JsonApiResource {
  type: 'tier'
  attributes: {
    amount_cents: number
    created_at: string
    description: string
    discord_role_ids: string[]
    edited_at: string
    patron_count: number
    published: boolean
    published_at: string
    requires_shipping: boolean
    title: string
    url: string
  }
}

export interface UserMembershipResourceAggregate {
  user: IdentityResource
  membership: MembershipResource
  tier: TierResource
  campaign: JsonApiResource
}
