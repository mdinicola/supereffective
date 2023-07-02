import {
  CampaignFields,
  CampaignMembersInclude,
  CampaignMembersQueryFields,
  IdentityInclude,
  IdentityQueryFields,
  MemberFields,
  TierFields,
  UserFields,
} from './types/api'

export const identityFields = {
  include: [IdentityInclude.Campaign, IdentityInclude.Memberships].join(','),
  [IdentityQueryFields.FieldsUser]: [
    UserFields.About,
    UserFields.Created,
    UserFields.Email,
    UserFields.FirstName,
    UserFields.FullName,
    UserFields.LastName,
    // UserFields.SocialConnections,
    UserFields.ThumbUrl,
    UserFields.ImageUrl,
    UserFields.Url,
    UserFields.Vanity,
  ].join(','),

  [IdentityQueryFields.FieldsCampaign]: [
    CampaignFields.Url,
    CampaignFields.Vanity,
    CampaignFields.IsMonthly,
    CampaignFields.Summary,
  ].join(','),
}

export const campaignMemberFields = {
  include: [CampaignMembersInclude.CurrentlyEntitledTiers, CampaignMembersInclude.User].join(','),
  [CampaignMembersQueryFields.FieldsMember]: [
    MemberFields.FullName,
    MemberFields.IsFollower,
    MemberFields.LastChargeDate,
    MemberFields.LastChargeStatus,
    MemberFields.LifetimeSupportCents,
    MemberFields.CurrentlyEntitledAmountCents,
    MemberFields.PatronStatus,
  ].join(','),
  [CampaignMembersQueryFields.FieldsTier]: [
    TierFields.AmountCents,
    TierFields.CreatedAt,
    TierFields.Description,
    TierFields.DiscordRoleIds,
    TierFields.EditedAt,
    TierFields.PatronCount,
    TierFields.Published,
    TierFields.PublishedAt,
    TierFields.RequiresShipping,
    TierFields.Title,
    TierFields.Url,
  ].join(','),
}
