import { GetServerSidePropsContext } from 'next'

import { getLegacyLivingDexRepository } from '@/features/livingdex/repository'
import { LivingDexResolvedUserLimits } from '@/features/livingdex/repository/types'
import { Dashboard } from '@/features/livingdex/views/Dashboard'
import PageMeta from '@/features/pages/components/PageMeta'
import { getPageRepository } from '@/features/pages/repository/getPageRepository'
import { PageEntry } from '@/features/pages/repository/types'
import { getSession } from '@/features/users/auth/serverside/getSession'
import { LoadingBanner } from '@/lib/components/layout/panels/LoadingBanner'
import { abs_url } from '@/lib/components/Links'

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
