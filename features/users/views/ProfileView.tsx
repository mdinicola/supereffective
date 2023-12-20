import { useRouter } from 'next/compat/router'

import { hasPatreonFeaturesEnabled } from '@/config/featureFlags'
import { useSession } from '@/features/users/auth/hooks/useSession'
import { useSignOut } from '@/features/users/auth/hooks/useSignOut'
import { createMembershipPlaceholder } from '@/features/users/repository/memberships'
import Button from '@/lib/components/Button'
import { UserRestrictedArea } from '@/lib/components/layout/panels/UserRestrictedArea'
import { patreonTiers } from '@/lib/patreon/config'
import { Membership } from '@/lib/prisma/types'

import { PatreonButton, PatreonUnlinkButton } from '../components/PatreonButtons'

export function ProfileView({
  membership,
}: {
  membership?: Membership | undefined
}): JSX.Element | null {
  const router = useRouter()
  const { status, error, provider, action } = router
    ? router.query
    : { status: undefined, error: undefined, provider: undefined, action: undefined }
  const auth = useSession()
  const signOut = useSignOut()

  const onLogoutClick = async () => {
    await signOut(true, '/login')
  }

  const _renderPatreonMembership = () => {
    if (!hasPatreonFeaturesEnabled() || !auth.currentUser) {
      return null
    }

    const hasMembership = !!membership?.patreonMemberId
    const _membership: Membership = membership ?? createMembershipPlaceholder(auth.currentUser.uid)
    const _expirationDate = _membership.expiresAt ? new Date(_membership.createdAt) : null

    return (
      <>
        <p>
          <b>Patreon Membership: </b>
          <code style={{ color: 'var(--color-pink-2)' }}>
            {patreonTiers[_membership.currentTier].name}
          </code>
        </p>
        <p>
          <b>Entitled Rewards: </b>
          <code style={{ color: 'var(--color-pink-2)' }}>
            {_membership.rewardMaxDexes} dexes
            {_membership.rewardFeaturedStreamer ? ', featured streamer' : ''}
          </code>
        </p>
        {hasMembership && _expirationDate && (
          <p>
            <b>Membership Expiration Date: </b>
            <code style={{ color: 'var(--color-pink-2)' }}>
              {_expirationDate.toLocaleDateString()}
            </code>
          </p>
        )}

        {!hasMembership && (
          <>
            <div>
              <PatreonButton />
            </div>
            {error === 'no_membership' && (
              <>
                <small
                  style={{
                    fontWeight: 'bold',
                    color: 'var(--color-scarlet-2)',
                    margin: '0.5rem 0',
                  }}
                >
                  Cannot link your Patreon account: You need to become a patron before you can link
                  your Patreon account.
                </small>
                <br />
                <small
                  style={{
                    fontWeight: 'normal',
                    color: 'var(--color-scarlet-2)',
                    margin: '0.5rem 0',
                  }}
                >
                  If you think this could be a mistake, please send us a message via Patreon,
                  indicating your Support ID and we will investigate the issue.
                </small>
                <br />
                <br />
              </>
            )}
            <small style={{ fontStyle: 'italic', color: '#777' }}>
              Link your Patreon account and become a patron to unlock extras in the website and
              Discord.
            </small>
          </>
        )}

        {hasMembership && (
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
