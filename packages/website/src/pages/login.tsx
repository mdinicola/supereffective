import PageMeta from '#/features/pages/components/PageMeta'
import { LoginView } from '#/features/users/views/LoginView'
import { abs_url } from '#/primitives/legacy/Link/Links'

const Page = () => {
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
          <LoginView />
        </div>
      </article>
    </div>
  )
}

export default Page
