import { GetServerSidePropsContext } from 'next'

import PageMeta from '@/features/pages/components/PageMeta'
import { ProfileView } from '@/features/users/views/ProfileView'
import { getSession } from '@/lib/auth/serverside/getSession'
import { abs_url } from '@/lib/components/legacy/Link/Links'
import { Membership } from '@/lib/prisma/types'
import { getActivePatreonMembershipByUserId } from '@/lib/repositories/users/memberships'
import { serializeObject } from '@/lib/utils/serialization/jsonSerializable'

const Page = ({ membership }: { membership: any | undefined }) => {
  const membershipData = membership ? serializeObject<Membership>(membership) : undefined
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
        <ProfileView membership={membershipData} />
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx.req, ctx.res)
  if (!session?.currentUser?.uid) {
    return {
      props: {
        membership: undefined,
      },
    }
  }

  const membership = await getActivePatreonMembershipByUserId(session.currentUser.uid)

  // console.log('membership', {membership, userId: session.currentUser.uid})

  return {
    props: {
      membership: membership ? serializeObject(membership) : null,
    },
  }
}

export default Page
