import { useAuth } from '#/features/legacy/users/state/UserContext'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import Button from '#/primitives/legacy/Button/Button'

export function ProfileView(): JSX.Element | null {
  const auth = useAuth()

  if (auth.state.loading) {
    return <LoadingBanner content={'Loading...'} />
  }

  if (!auth.state.user) {
    return <LoadingBanner content={'Please sign in to view this page.'} />
  }

  const onLogoutClick = async () => {
    await auth.logout()
  }

  return (
    <div>
      <h2>
        Welcome,{' '}
        <span style={{ color: 'var(--color-pink-2)' }}>{auth.state.user?.displayName}</span>
      </h2>
      <hr />
      <p>
        <b>Email: </b>
        <code style={{ color: 'var(--color-pink-2)' }}>{auth.state.user?.email}</code>
      </p>
      <p>
        <b>Display Name: </b>
        <code style={{ color: 'var(--color-pink-2)' }}>{auth.state.user?.displayName}</code>
      </p>
      <p>
        <b>Auth Provider: </b>
        <code style={{ color: 'var(--color-pink-2)' }}>{auth.state.user?.providerId}</code>
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
  )
}
