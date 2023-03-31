import React from 'react'

import { Dashboard } from '@app/src/domains/legacy/livingdex/views/Dashboard'
import { LoadingBanner } from '@app/src/layouts/LegacyLayout/LoadingBanner'
import PageMeta from '@app/src/layouts/LegacyLayout/PageMeta'
import { abs_url } from '@app/src/primitives/legacy/Link/Links'
import {
  CmsEntry,
  CmsEntryType,
  getStaticPropsForEntry,
} from '@app/src/services/legacy/cms/HeadlessCms'
import PkSpriteStyles from '@app/src/styles/legacy/PkSpriteStyles'

export async function getStaticProps() {
  return await getStaticPropsForEntry(CmsEntryType.Page, 'livingdex', '/', 60 * 60 * 24)
}

const Page = ({ entry }: { entry: CmsEntry | null }) => {
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
