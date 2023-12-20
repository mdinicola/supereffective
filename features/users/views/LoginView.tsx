import { useState } from 'react'
import { useRouter } from 'next/compat/router'

import { isSignInEnabled } from '@/config/featureFlags'
import { Routes } from '@/config/routes'
import EmailSigninView from '@/features/users/views/EmailSigninView'
import { OAuthButtonsView } from '@/features/users/views/OAuthButtonsView'
import TokenSignInView from '@/features/users/views/TokenSignInView'
import { useSession } from '@/lib/auth/hooks/useSession'
import { LoadingBanner } from '@/lib/components/layout/panels/LoadingBanner'
import { LoadingRedirectBanner } from '@/lib/components/layout/panels/LoadingRedirectBanner'
import { SiteLink } from '@/lib/components/legacy/Link/Links'

export function LoginView({ csrfToken }: { csrfToken: string | null }): JSX.Element {
  const router = useRouter()
  const auth = useSession()
  const [tokenMode, setTokenMode] = useState(false)

  if (auth.isLoading()) {
    return <LoadingBanner />
  }

  if (router && router.query.error) {
    router.push(Routes.AuthError + '?error=' + router.query.error)
    return <LoadingBanner />
  }

  if (auth.isAuthenticated() && !auth.isVerified()) {
    return (
      <LoadingRedirectBanner
        routeUri={
          Routes.VerifyEmail + '?email=' + encodeURIComponent(auth.currentUser?.email || '')
        }
      />
    )
  }

  if (auth.isAuthenticated() && auth.isOperable() && auth.isVerified()) {
    return <LoadingRedirectBanner routeUri={Routes.Profile} />
  }

  if (!isSignInEnabled()) {
    return (
      <div className="text-center">
        <h2>
          <i className={'icon-user'} /> Sign In
        </h2>
        <p
          className={'inner-container bg-gr-white-pattern text-center'}
          style={{ fontSize: '1.3rem' }}
        >
          We are currently experiencing issues with our Sign In system. <br />
          Please check back later.
        </p>
      </div>
    )
  }

  return (
    <div className="text-center">
      <h2>
        <i className={'icon-user'} /> Sign In
      </h2>
      <p className={'inner-container bg-gr-white-pattern text-left'}>
        When you sign in, you'll be able to save your{' '}
        <b>
          <i className={'icon-pkg-box-home'}></i>Living Pokédex
        </b>{' '}
        progress and use all other upcoming features of the website.
      </p>
      {!tokenMode && (
        <>
          <EmailSigninView csrfToken={csrfToken} />
          <p>
            Do you want to use the token you got via email?{' '}
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                setTokenMode(true)
              }}
              style={{ color: 'var(--color-link)', textDecoration: 'underline' }}
            >
              Sign In with Token
            </a>
          </p>
        </>
      )}
      {tokenMode && <TokenSignInView csrfToken={csrfToken} />}
      <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
        By signing in, you agree to our{' '}
        <SiteLink href={'/terms-and-conditions'}>
          <b>Terms and Conditions</b>
        </SiteLink>
      </p>
      <OAuthButtonsView />
    </div>
  )
}
