import { ReactNode, useState } from 'react'

import { useRouter } from 'next/router'

import { OAuthProviderName } from '@pkg/auth/lib/types'

import { useAuth } from '#/features/legacy/users/state/UserContext'
import { transformAuthError } from '#/features/users/transformAuthError'
import { useConditionalRedirect } from '#/hooks/legacy/useConditionalRedirect'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import Button from '#/primitives/legacy/Button/Button'
import { SiteLink } from '#/primitives/legacy/Link/Links'

export function LoginView(): JSX.Element {
  const router = useRouter()
  const auth = useAuth()
  const [loginError, setLoginError] = useState<ReactNode>(null)
  const backRoute = router.query.back

  const redirectRoute =
    (typeof backRoute === 'string' ? decodeURIComponent(backRoute) : null) || '/apps/livingdex'

  useConditionalRedirect(
    redirectRoute as string,
    {
      waitIf: auth.state.loading,
      redirectIf: !auth.state.loading && auth.state.user !== null,
      abortRedirectIf: !auth.state.loading && auth.state.user === null,
    },
    1000
  )

  if (auth.state.loading) {
    return <LoadingBanner />
  }

  const handleLoginWithGoogle = async () => {
    // auth.enterLoadingMode()
    await auth
      .signIn(OAuthProviderName.Google)
      .then(user => {
        // tracker.loggedIn(user.user.uid)
      })
      .catch(err => {
        setLoginError(<div className="error">{transformAuthError(err)}</div>)
      })
  }
  const handleLoginWithTwitter = async () => {
    // auth.enterLoadingMode()
    await auth
      .signIn(OAuthProviderName.Twitter)
      .then(user => {
        // tracker.loggedIn(user.user.uid)
      })
      .catch(err => {
        setLoginError(<div className="error">{transformAuthError(err)}</div>)
      })
  }
  const handleLoginWithGithub = async () => {
    // auth.enterLoadingMode()
    await auth
      .signIn(OAuthProviderName.Github)
      .then(user => {
        // tracker.loggedIn(user.user.uid)
      })
      .catch(err => {
        setLoginError(<div className="error">{transformAuthError(err)}</div>)
      })
  }

  const loginForm = (
    <div className="text-center">
      <h2>
        <i className={'icon-user'} /> Sign In
      </h2>
      {loginError && (
        <div
          className="loginError"
          style={{
            color: '#cb2c2c',
            fontSize: '1.2em',
            fontWeight: 'bold',
            marginBottom: '1em',
            padding: '1em',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '1rem',
          }}
        >
          <h4>Sign In Error</h4>

          {loginError}
        </div>
      )}
      <p className={'inner-container bg-gr-white-pattern text-left'}>
        When you sign in, you'll be able to save your{' '}
        <b>
          <i className={'icon-pkg-box-home'}></i>Living Pokédex
        </b>{' '}
        progress and use all other upcoming features of the website.
      </p>
      <div className="formGroup">
        <div className="formButtons">
          <Button onClick={handleLoginWithGoogle}>
            <i className="icon-user"></i> Sign In with Google
          </Button>
          <Button onClick={handleLoginWithTwitter}>
            <i className="icon-brand-twitter"></i> Sign In with Twitter
          </Button>
          <Button onClick={handleLoginWithGithub}>
            <i className="icon-brand-github"></i> Sign In with Github
          </Button>
        </div>
        <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
          By signing in, you agree to our{' '}
          <SiteLink href={'/terms-and-conditions'}>
            <b>Terms and Conditions</b>
          </SiteLink>
        </p>
      </div>
    </div>
  )

  return <>{auth.state.loading ? <LoadingBanner content={'Logging in...'} /> : loginForm}</>
}
