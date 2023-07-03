import { GetServerSidePropsContext } from 'next'

import { getSession } from '@pkg/auth/lib/serverside/getSession'
import { getLegacyLivingDexRepository } from '@pkg/database/repositories/living-dexes/legacy'
import { LivingDexResolvedUserLimits } from '@pkg/database/repositories/living-dexes/legacy/types'
import { getPageRepository } from '@pkg/database/repositories/pages/getPageRepository'
import { PageEntry } from '@pkg/database/repositories/pages/types'

import { Dashboard } from '#/features/livingdex/views/Dashboard'
import PageMeta from '#/features/pages/components/PageMeta'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import { abs_url } from '#/primitives/legacy/Link/Links'
import PkSpriteStyles from '#/styles/legacy/PkSpriteStyles'

const Page = ({
  entry,
  limits,
}: {
  entry: PageEntry | null
  limits: LivingDexResolvedUserLimits
}) => {
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
        <Dashboard limits={limits} />
      </>
    </div>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const pageProps = getPageRepository().getStaticProps('livingdex', 60 * 60 * 24) // 24h
  const session = await getSession(ctx.req, ctx.res)

  if (!session?.currentUser?.uid) {
    return {
      props: {
        entry: pageProps.props?.entry ?? null,
        limits: null,
      },
    }
  }

  const resolvedLimits = await getLegacyLivingDexRepository().getResolvedLimitsForUser(
    session.currentUser.uid
  )

  return {
    props: {
      entry: pageProps.props?.entry ?? null,
      limits: resolvedLimits,
    },
  }
}

export default Page
