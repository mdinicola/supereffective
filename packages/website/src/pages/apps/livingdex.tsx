import { Dashboard } from '#/features/legacy/livingdex/views/Dashboard'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import PageMeta from '#/layouts/LegacyLayout/PageMeta'
import { abs_url } from '#/primitives/legacy/Link/Links'
import { getPageStaticProps, PageEntry } from '#/services/cms'
import PkSpriteStyles from '#/styles/legacy/PkSpriteStyles'

export function getStaticProps() {
  return getPageStaticProps('livingdex', 60 * 60 * 24) // 24h
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
