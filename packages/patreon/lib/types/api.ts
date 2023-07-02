export enum IdentityInclude {
  Campaign = 'campaign',
  Memberships = 'memberships',
}

export enum IdentityQueryFields {
  Include = 'include',
  FieldsUser = 'fields[user]',
  FieldsCampaign = 'fields[campaign]',
}

export enum CampaignMembersInclude {
  CurrentlyEntitledTiers = 'currently_entitled_tiers',
  User = 'user',
  Campaign = 'campaign',
}

export enum CampaignMembersQueryFields {
  Include = 'include',
  FieldsMember = 'fields[member]',
  FieldsTier = 'fields[tier]',
  FieldsCampaign = 'fields[campaign]',
}

export enum CampaignFields {
  CreatedAt = 'created_at',
  DiscordServerId = 'discord_server_id',
  HasRss = 'has_rss',
  HasSentRssNotify = 'has_sent_rss_notify',
  ImageSmallUrl = 'image_small_url',
  ImageUrl = 'image_url',
  IsChargedImmediately = 'is_charged_immediately',
  IsMonthly = 'is_monthly',
  IsNsfw = 'is_nsfw',
  IsPlural = 'is_plural',
  MainVideoEmbed = 'main_video_embed',
  MainVideoUrl = 'main_video_url',
  OneLiner = 'one_liner',
  OutroVideoEmbed = 'outro_video_embed',
  OutroVideoUrl = 'outro_video_url',
  PayPerName = 'pay_per_name',
  PayPerThing = 'pay_per_thing',
  PublishedAt = 'published_at',
  ShowEarnings = 'show_earnings',
  Summary = 'summary',
  ThanksEmbed = 'thanks_embed',
  ThanksMsg = 'thanks_msg',
  ThanksVideoUrl = 'thanks_video_url',
  Url = 'url',
  Vanity = 'vanity',
}

export enum UserFields {
  About = 'about',
  Created = 'created',
  Email = 'email',
  FirstName = 'first_name',
  FullName = 'full_name',
  ImageUrl = 'image_url',
  LastName = 'last_name',
  SocialConnections = 'social_connections',
  ThumbUrl = 'thumb_url',
  Url = 'url',
  Vanity = 'vanity',
}

export enum MemberFields {
  FullName = 'full_name',
  IsFollower = 'is_follower',
  LastChargeDate = 'last_charge_date',
  LastChargeStatus = 'last_charge_status',
  LifetimeSupportCents = 'lifetime_support_cents',
  CurrentlyEntitledAmountCents = 'currently_entitled_amount_cents',
  PatronStatus = 'patron_status',
}

export enum TierFields {
  AmountCents = 'amount_cents',
  CreatedAt = 'created_at',
  Description = 'description',
  DiscordRoleIds = 'discord_role_ids',
  EditedAt = 'edited_at',
  PatronCount = 'patron_count',
  Published = 'published',
  PublishedAt = 'published_at',
  RequiresShipping = 'requires_shipping',
  Title = 'title',
  Url = 'url',
}

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
