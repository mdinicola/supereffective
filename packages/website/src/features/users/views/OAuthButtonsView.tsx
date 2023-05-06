import { ReactNode, useState } from 'react'

import { useSession } from '@pkg/auth/lib/hooks/useSession'
import { useSignIn } from '@pkg/auth/lib/hooks/useSignIn'
import { OAuthProviderName } from '@pkg/auth/lib/types'

import { transformAuthError } from '#/features/users/transformAuthError'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import Button from '#/primitives/legacy/Button/Button'

export function OAuthButtonsView(): JSX.Element {
  const auth = useSession()
  const signIn = useSignIn()
  const [loginError, setLoginError] = useState<ReactNode>(null)

  if (auth.isLoading()) {
    return <LoadingBanner />
  }

  const handleLoginWithGoogle = async () => {
    await signIn
      .signInWithProvider(OAuthProviderName.Google)
      .then(user => {
        // tracker.loggedIn(user.user.uid)
      })
      .catch(err => {
        setLoginError(<div className="error">{transformAuthError(err)}</div>)
      })
  }
  const handleLoginWithTwitter = async () => {
    await signIn
      .signInWithProvider(OAuthProviderName.Twitter)
      .then(user => {
        // tracker.loggedIn(user.user.uid)
      })
      .catch(err => {
        setLoginError(<div className="error">{transformAuthError(err)}</div>)
      })
  }
  const handleLoginWithGithub = async () => {
    await signIn
      .signInWithProvider(OAuthProviderName.Github)
      .then(user => {
        // tracker.loggedIn(user.user.uid)
      })
      .catch(err => {
        setLoginError(<div className="error">{transformAuthError(err)}</div>)
      })
  }

  return (
    <div className="text-center">
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
      <div className="formGroup">
        <div className="formButtons">
          <Button onClick={handleLoginWithGoogle} inverted>
            <i className="icon-user"></i> Login with Google
          </Button>
          <Button onClick={handleLoginWithTwitter} inverted>
            <i className="icon-brand-twitter"></i> Login with Twitter
          </Button>
          <Button onClick={handleLoginWithGithub} inverted>
            <i className="icon-brand-github"></i> Login with Github
          </Button>
        </div>
        <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
          OAuth providers are only available for old user accounts.
          <br />
          You cannot create an account via these providers anymore. To create a new account, just
          use the email Sign In.
          <br />
          <br />
          Login via OAuth will be available until May 31st, 2023, after that only email Sign In will
          be available.
          <br />
          OAuth accounts will be automatically converted to email Sign In accounts.
          <br />
        </p>
      </div>
    </div>
  )
}
