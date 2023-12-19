import { GetServerSidePropsContext } from 'next'

import { Dashboard } from '@/features/livingdex/views/Dashboard'
import PageMeta from '@/features/pages/components/PageMeta'
import { getSession } from '@/lib/auth/serverside/getSession'
import { LoadingBanner } from '@/lib/components/layouts/LegacyLayout/LoadingBanner'
import { abs_url } from '@/lib/components/legacy/Link/Links'
import { getLegacyLivingDexRepository } from '@/lib/repositories/living-dexes/legacy'
import { LivingDexResolvedUserLimits } from '@/lib/repositories/living-dexes/legacy/types'
import { getPageRepository } from '@/lib/repositories/pages/getPageRepository'
import { PageEntry } from '@/lib/repositories/pages/types'

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
