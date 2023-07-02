import { useRouter } from 'next/router'

import PageMeta from '#/features/pages/components/PageMeta'
import { abs_url } from '#/primitives/legacy/Link/Links'

//

export default function Page() {
  const router = useRouter()
  const { error } = router.query
  let errorMessage: React.ReactNode = 'Unexpected sign in error'
  switch (String(error).toLowerCase()) {
    default:
      errorMessage = <>Server Error: {error ? <i>{`: ${error}`}</i> : ''}</>
  }
  return (
    <>
      <div className={'page-container'}>
        <PageMeta
          metaTitle={'Sign In error - Supereffective.gg'}
          metaDescription={''}
          robots={'noindex, nofollow'}
          canonicalUrl={abs_url('/auth/error')}
          lang={'en'}
        />
        <article className={'page-authored-content'}>
          <div className={'page-container text-center bordered-container bg-white'}>
            <h2>Server Error</h2>
            <p>❌ {errorMessage}</p>
          </div>
        </article>
      </div>
    </>
  )
}
