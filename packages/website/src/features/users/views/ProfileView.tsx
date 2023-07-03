import { useRouter } from 'next/router'

import { useSession } from '@pkg/auth/lib/hooks/useSession'
import { useSignOut } from '@pkg/auth/lib/hooks/useSignOut'
import { hasPatreonFeaturesEnabled } from '@pkg/config/default/featureFlags'
import { Membership } from '@pkg/database/lib/types'

import { UserRestrictedArea } from '#/layouts/UserRestrictedArea'
import Button, { PatreonButton, PatreonUnlinkButton } from '#/primitives/legacy/Button/Button'

import { createMembershipPlaceholder } from '../../../../../database/repositories/users/patrons'
import { PATREON_TIERS_BY_ID } from '../../../../../patreon/lib/types/campaign'

export function ProfileView({
  membership,
}: {
  membership?: Membership | undefined
}): JSX.Element | null {
  const { status, error, provider, action } = useRouter().query
  const auth = useSession()
  const signOut = useSignOut()

  const onLogoutClick = async () => {
    await signOut(true, '/login')
  }

  const _renderPatreonMembership = () => {
    if (!hasPatreonFeaturesEnabled() || !auth.currentUser) {
      return null
    }

    const _membership: Membership = membership ?? createMembershipPlaceholder(auth.currentUser.uid)

    return (
      <>
        <p>
          <b>Patreon Membership: </b>
          <code style={{ color: 'var(--color-pink-2)' }}>
            {PATREON_TIERS_BY_ID[_membership.currentTier].name}
          </code>
        </p>
        <p>
          <b>Entitled Rewards: </b>
          <code style={{ color: 'var(--color-pink-2)' }}>
            {_membership.rewardMaxDexes} dexes
            {_membership.rewardFeaturedStreamer ? ', featured streamer' : ''}
          </code>
        </p>

        {!membership && (
          <>
            <div>
              <PatreonButton />
            </div>
            {error === 'no_membership' && (
              <small
                style={{ fontWeight: 'bold', color: 'var(--color-scarlet-2)', margin: '0.5rem 0' }}
              >
                Cannot link your Patreon account: You need to become a patron before you can link
                your Patreon account.
                <br />
              </small>
            )}
            <small style={{ fontStyle: 'italic', color: '#777' }}>
              Link your Patreon account and become a patron to unlock more benefits.
            </small>
          </>
        )}

        {membership && (
          <>
            <div>
              <PatreonUnlinkButton memberId={membership.patreonMemberId} />
            </div>
          </>
        )}
        <hr />
      </>
    )
  }

  return (
    <UserRestrictedArea>
      <div>
        <h2>
          Welcome,{' '}
          <span style={{ color: 'var(--color-pink-2)' }}>{auth.currentUser?.displayName}</span>
        </h2>
        <hr />
        <p>
          <b>Display Name: </b>
          <code style={{ color: 'var(--color-pink-2)' }}>{auth.currentUser?.displayName}</code>
        </p>
        <p>
          <b>Email: </b>
          <code style={{ color: 'var(--color-pink-2)' }}>{auth.currentUser?.email}</code>
        </p>
        <hr />
        {_renderPatreonMembership()}
        <p>
          <b>Support ID: </b>
          <code style={{ color: 'var(--color-pink-2)' }}>{auth.currentUser?.uid}</code>
        </p>
        <hr />
        <div className="text-right">
          <Button onClick={onLogoutClick}>Logout</Button>
        </div>
        <br />
        <div style={{ color: 'var(--color-black-3)', fontStyle: 'italic', fontSize: '0.8rem' }}>
          This page is still a work in progress.
        </div>
      </div>
    </UserRestrictedArea>
  )
}
