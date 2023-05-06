import { useSession } from '@pkg/auth/lib/hooks/useSession'

import { Routes } from '#/config/routes'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import { RedirectArea } from '#/layouts/RedirectArea'

export type UserRestrictedAreaProps = {
  children: React.ReactNode
  loadingComponent?: React.ReactNode
  unauthenticatedComponent?: React.ReactNode
  unverifiedComponent?: React.ReactNode
}

export function UserRestrictedArea({
  children,
  loadingComponent,
  unauthenticatedComponent,
  unverifiedComponent,
}: UserRestrictedAreaProps): JSX.Element {
  const auth = useSession()

  if (auth.isLoading()) {
    return <>{loadingComponent ? loadingComponent : <LoadingBanner />}</>
  }

  if (auth.isAuthenticated() && !auth.isVerified()) {
    // is probably a firebase user
    const redirectUri =
      Routes.VerifyEmail + '?email=' + encodeURIComponent(auth.currentUser?.email || '')
    return (
      <>{unverifiedComponent ? unverifiedComponent : <RedirectArea routeUri={redirectUri} />}</>
    )
  }

  if (auth.isUnauthenticated() || !auth.isOperable()) {
    const redirectUri = Routes.Login
    return (
      <>
        {unauthenticatedComponent ? (
          unauthenticatedComponent
        ) : (
          <RedirectArea routeUri={redirectUri}>
            <LoadingBanner />
          </RedirectArea>
        )}
      </>
    )
  }

  return <>{children}</>
}
