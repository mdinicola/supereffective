import { GetServerSidePropsContext } from 'next'

import { createCsrfToken } from '@pkg/auth/lib/serverside/createCsrfToken'

import PageMeta from '#/features/pages/components/PageMeta'
import { LoginView } from '#/features/users/views/LoginView'
import { abs_url } from '#/primitives/legacy/Link/Links'

const Page = ({ csrfToken }: { csrfToken: string | null }) => {
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
        <div className={'page-container text-center bordered-container bg-white'}>
          <LoginView csrfToken={csrfToken} />
        </div>
      </article>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await createCsrfToken(context)
  return {
    props: { csrfToken },
  }
}

export default Page
