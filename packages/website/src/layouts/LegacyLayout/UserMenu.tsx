import { ReactElement } from 'react'

import { useAuth } from '#/features/legacy/users/state/UserContext'

export default function UserMenu({ loginLink }: { loginLink: ReactElement }) {
  const auth = useAuth()

  const onLogoutClick = async () => {
    await auth.logout()
    // tracker.loggedOut()
    return false
  }

  if (auth.state.loading) {
    return (
      <a href="#" style={{ background: 'none !important' }}>
        Loading...
      </a>
    )
  }

  if (!auth.state.user) {
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
