import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/compat/router'

import { Routes } from '@/config/routes'
import PageMeta from '@/features/pages/components/PageMeta'
import { useSession } from '@/features/users/auth/hooks/useSession'
import { useSignOut } from '@/features/users/auth/hooks/useSignOut'
import { createCsrfToken } from '@/features/users/auth/serverside/createCsrfToken'
import EmailSigninView from '@/features/users/views/EmailSigninView'
import Button from '@/lib/components/Button'
import { LoadingBanner } from '@/lib/components/layout/panels/LoadingBanner'
import { UnauthenticatedBanner } from '@/lib/components/layout/panels/UnauthenticatedBanner'
import { abs_url } from '@/lib/components/Links'

export default function Page({ csrfToken }: { csrfToken: string | null }) {
  const auth = useSession()
  const logout = useSignOut()
  const router = useRouter()

  if (!auth.isAuthenticated()) {
    return <UnauthenticatedBanner />
  }

  if (auth.isLoading()) {
    return <LoadingBanner />
  }

  if (auth.isAuthenticated() && auth.isVerified() && auth.isOperable()) {
    router?.push(Routes.Profile)
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
