import { useSession } from '@pkg/auth/lib/hooks/useSession'
import { useSignOut } from '@pkg/auth/lib/hooks/useSignOut'

import { UserRestrictedArea } from '#/layouts/UserRestrictedArea'
import Button, { PatreonButton } from '#/primitives/legacy/Button/Button'

import { hasPatreonFeaturesEnabled } from '../../../../../config/default/featureFlags'

export function ProfileView(): JSX.Element | null {
  const auth = useSession()
  const signOut = useSignOut()

  const onLogoutClick = async () => {
    await signOut(true, '/login')
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
          <b>Email: </b>
          <code style={{ color: 'var(--color-pink-2)' }}>{auth.currentUser?.email}</code>
        </p>
        <p>
          <b>Display Name: </b>
          <code style={{ color: 'var(--color-pink-2)' }}>{auth.currentUser?.displayName}</code>
        </p>
        <p>
          <b>Auth Provider: </b>
          <code style={{ color: 'var(--color-pink-2)' }}>{auth.currentUser?.providerId}</code>
        </p>
        <p>
          <b>Support ID: </b>
          <code style={{ color: 'var(--color-pink-2)' }}>{auth.currentUser?.uid}</code>
        </p>
        {hasPatreonFeaturesEnabled() && (
          <>
            <hr />
            <div>
              <PatreonButton />
            </div>
          </>
        )}
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
