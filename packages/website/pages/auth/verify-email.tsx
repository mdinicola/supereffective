import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import { useSession } from '@pkg/auth/lib/hooks/useSession'
import { useSignOut } from '@pkg/auth/lib/hooks/useSignOut'
import { createCsrfToken } from '@pkg/auth/lib/serverside/createCsrfToken'

import { Routes } from '#/config/routes'
import PageMeta from '#/features/pages/components/PageMeta'
import EmailSigninView from '#/features/users/views/EmailSigninView'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import { UnauthenticatedBanner } from '#/layouts/LegacyLayout/UnauthenticatedBanner'
import Button from '#/primitives/legacy/Button/Button'
import { abs_url } from '#/primitives/legacy/Link/Links'

export default function Page({ csrfToken }: { csrfToken: string | null }) {
  const auth = useSession()
  const logout = useSignOut()
  const router = useRouter()

  if (!auth.isAuthenticated()) {
    return <UnauthenticatedBanner />
  }
  // if (!auth.isAuthenticated() && isClientSide()) {
  //   router.push(Routes.Login)
  //   return <UnauthenticatedBanner />
  // }

  if (auth.isAuthenticated() && auth.isVerified() && auth.isOperable()) {
    router.push(Routes.Profile)
    return <LoadingBanner />
  }

  return (
    <>
      <div className={'page-container'}>
        <PageMeta
          metaTitle={'Verify Email - Supereffective.gg'}
          metaDescription={''}
          robots={'noindex, nofollow'}
          canonicalUrl={abs_url('/auth/verify-email')}
          lang={'en'}
        />
        <article className={'page-authored-content'}>
          <div className={'page-container text-center bordered-container bg-white'}>
            <h2>
              Sign In with Email <i className="icon-email" />
            </h2>
            <p>
              <b style={{ color: 'darkgoldenrod' }}>Login via external providers is deprecated.</b>
              <br />
              <br />
              To continue, please verify your email by signing in with <br />
              the new email-based authentication system.
            </p>
            <EmailSigninView
              csrfToken={csrfToken}
              firebaseUserId={auth.currentUser?.uid}
              email={auth.currentUser?.email || undefined}
              buttonText={'Send Sign In Link'}
            />
            <br />
            <Button onClick={logout}>Logout</Button>
          </div>
        </article>
      </div>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await createCsrfToken(context)
  return {
    props: { csrfToken },
  }
}
