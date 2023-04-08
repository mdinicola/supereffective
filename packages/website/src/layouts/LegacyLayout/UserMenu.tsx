import { ReactElement, useContext } from 'react'
import { useLoginDetection } from '#/features/legacy/users/hooks/useLoginDetection'
import { UserContext } from '#/features/legacy/users/state/UserContext'
import { logout as firebaseLogout } from '#/services/legacy/datastore/Firebase'
import tracker from '#/services/legacy/metrics/tracker'

export default function UserMenu({ loginLink }: { loginLink: ReactElement }) {
  const userCtx = useContext(UserContext)
  const { state, logout } = userCtx
  useLoginDetection(userCtx)

  const onLogoutClick = async () => {
    await firebaseLogout()
    await logout()
    tracker.loggedOut()
    return false
  }

  if (state.loading) {
    return (
      <a href="#" style={{ background: 'none !important' }}>
        Loading...
      </a>
    )
  }

  if (!state.user) {
    return loginLink
  }

  return (
    <>
      {/*<SiteLink href="/profile" activeClass={styles.active}>*/}
      {/*  {state.user.pictureUrl &&*/}
      {/*    <img className="profile-pic margin-r" src={state.user.pictureUrl} width={24} height={24}/>} Profile*/}
      {/*</SiteLink>*/}
      <a
        tabIndex={5}
        href="#"
        onClick={() => {
          onLogoutClick()
          return false
        }}
      >
        {' '}
        <i className={'icon-exit'}></i> <span>Sign Out</span>
      </a>
    </>
  )
}
