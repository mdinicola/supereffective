import { getPageRepository } from '@pkg/database/repositories/pages/getPageRepository'
import { PageEntry } from '@pkg/database/repositories/pages/types'

import { Dashboard } from '#/features/legacy/livingdex/views/Dashboard'
import PageMeta from '#/features/pages/components/PageMeta'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import { abs_url } from '#/primitives/legacy/Link/Links'
import PkSpriteStyles from '#/styles/legacy/PkSpriteStyles'

export function getStaticProps() {
  return getPageRepository().getStaticProps('livingdex', 60 * 60 * 24) // 24h
}

const Page = ({ entry }: { entry: PageEntry | null }) => {
  if (!entry) {
    return <LoadingBanner />
  }

  return (
    <div className={'page-container '} style={{ maxWidth: 'none' }}>
      <PageMeta
        metaTitle={entry.metaTitle}
        metaDescription={entry.metaDescription}
        robots={entry.robots}
        imageUrl={abs_url('/assets/livingdex.png')}
        canonicalUrl={abs_url('/apps/livingdex')}
        lang={'en'}
      />
      <>
        <PkSpriteStyles />
        <Dashboard />
      </>
    </div>
  )
}

export default Page
