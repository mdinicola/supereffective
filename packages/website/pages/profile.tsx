import PageMeta from '#/features/pages/components/PageMeta'
import { ProfileView } from '#/features/users/views/ProfileView'
import { abs_url } from '#/primitives/legacy/Link/Links'

const Page = () => {
  return (
    <div className={'page-container'}>
      <PageMeta
        metaTitle={'Profile - Supereffective'}
        metaDescription={''}
        robots={'noindex, nofollow'}
        canonicalUrl={abs_url('/profile')}
        lang={'en'}
      />
      <div className={'page-container bg-white bordered-container'}>
        <ProfileView />
      </div>
    </div>
  )
}

export default Page
