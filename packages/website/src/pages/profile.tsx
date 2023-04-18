import { useContext, useEffect } from 'react'

import { useRouter } from 'next/router'

import { UserContext } from '#/features/legacy/users/state/UserContext'
import PageMeta from '#/features/pages/components/PageMeta'
import { abs_url } from '#/primitives/legacy/Link/Links'

const Page = () => {
  const router = useRouter()
  const appAuth = useContext(UserContext)

  useEffect(() => {
    // console.log('redirecting to login page')
    if (!appAuth.state.user) {
      router.push('/login')
    }
  }, [appAuth.state.user])

  return (
    <div className={'page-container'}>
      <PageMeta
        metaTitle={'Login - Supereffective'}
        metaDescription={''}
        robots={'noindex, nofollow'}
        canonicalUrl={abs_url('/login')}
        lang={'en'}
      />
      <div className={'page-container bg-white bordered-container'}>
        <p>Welcome,</p>
        <code>You are logged in as '{appAuth.state.user?.displayName}'</code>
        <blockquote>
          This page is still work in progress. Soon you will be able to edit your profile.
        </blockquote>
      </div>
    </div>
  )
}

export default Page