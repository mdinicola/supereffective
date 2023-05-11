import { useRouter } from 'next/router'

import { useSession } from '@pkg/auth/lib/hooks/useSession'
import { isSignInEnabled } from '@pkg/config/default/featureFlags'

import { Routes } from '#/config/routes'
import EmailSigninView from '#/features/users/views/EmailSigninView'
import { OAuthButtonsView } from '#/features/users/views/OAuthButtonsView'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import { RedirectArea } from '#/layouts/RedirectArea'
import { SiteLink } from '#/primitives/legacy/Link/Links'

export function LoginView({ csrfToken }: { csrfToken: string | null }): JSX.Element {
  const router = useRouter()
  const auth = useSession()

  if (auth.isLoading()) {
    return <LoadingBanner />
  }

  if (router.query.error) {
    router.push(Routes.AuthError + '?error=' + router.query.error)
    return <LoadingBanner />
  }

  if (auth.isAuthenticated() && !auth.isVerified()) {
    // is probably a firebase user
    return (
      <RedirectArea
        routeUri={
          Routes.VerifyEmail + '?email=' + encodeURIComponent(auth.currentUser?.email || '')
        }
      />
    )
  }

  if (auth.isAuthenticated() && auth.isOperable() && auth.isVerified()) {
    return <RedirectArea routeUri={Routes.Profile} />
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
      <EmailSigninView csrfToken={csrfToken} email={auth.currentUser?.email || undefined} />
      <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
        By signing in, you agree to our{' '}
        <SiteLink href={'/terms-and-conditions'}>
          <b>Terms and Conditions</b>
        </SiteLink>
      </p>
      <div className="lined-text">
        <p>Or login using an old existing account, via:</p>
      </div>
      <OAuthButtonsView />
    </div>
  )
}
