import { ReactNode, useState } from 'react'

import { useRouter } from 'next/router'

import { OAuthProviderName } from '@pkg/auth/src/types'

import { useAuth } from '#/features/legacy/users/state/UserContext'
import { useConditionalRedirect } from '#/hooks/legacy/useConditionalRedirect'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import PageMeta from '#/layouts/LegacyLayout/PageMeta'
import Button from '#/primitives/legacy/Button/Button'
import { abs_url, SiteLink } from '#/primitives/legacy/Link/Links'

const interpretError = (err: Error | any) => {
  console.warn('Auth failed', { err })

  const errStr = err.code + err.message + err.toString()
  if (errStr.includes('auth/account-exists-with-different-credential')) {
    const _email = err.customData?.email ? `: "${err.customData.email}"` : ''
    const _providers = err.customData?._tokenResponse?.verifiedProvider
    const _provider = Array.isArray(_providers) && _providers.length > 0 ? _providers[0] : null
    return (
      <p>
        ⚠ This account already exists with a different provider.
        <br />
        <br />
        It seems you already have an account using the same email address{_email}, but with a
        different auth provider:{' '}
        <code style={{ background: '#d7d7d7', color: '#000' }}>{_provider}</code>.
        <br />
        <br />
        Please sign in with that provider instead.
      </p>
    )
  }
  if (errStr.includes('auth/invalid-credential')) {
    return 'Invalid credential. Please reload the page and try again.'
  }
  if (errStr.includes('auth/user-disabled')) {
    return 'This account has been disabled.'
  }
  return err.message
}

const Page = () => {
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
        setLoginError(<div className="error">{interpretError(err)}</div>)
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
        setLoginError(<div className="error">{interpretError(err)}</div>)
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
        setLoginError(<div className="error">{interpretError(err)}</div>)
      })
  }

  const loginForm = (
    <div className={'page-container text-center bordered-container bg-white'}>
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

  return (
    <div className={'page-container'}>
      <PageMeta
        metaTitle={'Sign In - Supereffective.gg'}
        metaDescription={''}
        robots={'noindex, nofollow'}
        canonicalUrl={abs_url('/login')}
        lang={'en'}
      />
      <article className={'page-authored-content'}>
        {auth.state.loading ? <LoadingBanner content={'Logging in...'} /> : loginForm}
      </article>
    </div>
  )
}

export default Page
