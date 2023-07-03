import { useGuardedFetch } from '@pkg/auth/lib/hooks/useGuardedFetch'
import { useSession } from '@pkg/auth/lib/hooks/useSession'
import { LoadedDexList } from '@pkg/database/repositories/living-dexes/legacy/types'
import { getPageRepository } from '@pkg/database/repositories/pages/getPageRepository'
import { PageEntry } from '@pkg/database/repositories/pages/types'

import { Routes } from '#/config/routes'
import { GameCardList } from '#/features/livingdex/views/gameCard/GameCard'
import PageMeta from '#/features/pages/components/PageMeta'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import Button, { ButtonInternalLink } from '#/primitives/legacy/Button/Button'
import { abs_url } from '#/primitives/legacy/Link/Links'
import PkSpriteStyles from '#/styles/legacy/PkSpriteStyles'

export function getStaticProps() {
  return getPageRepository().getStaticProps('livingdex', 60 * 60 * 24) // 24h
}

const Page = ({ entry }: { entry: PageEntry | null }) => {
  const auth = useSession()
  const swr = useGuardedFetch<LoadedDexList>(Routes.API.LegacyLivingDexes)

  if (!entry || auth.isLoading()) {
    return <LoadingBanner />
  }

  if (!auth.isAuthenticated()) {
    return <LoadingBanner content="Login to view this page" />
  }

  if (!swr.isReady) {
    return <LoadingBanner />
  }

  if (swr.error) {
    return <LoadingBanner content={'❌ An internal server error ocurred.'} />
  }

  const dexes = swr.data ?? []
  const email = auth.currentUser?.email

  if (dexes.length === 0 || !email) {
    const content = (
      <>
        <p>No old dexes found</p>
        <ButtonInternalLink href={Routes.LivingDex}>Go Back</ButtonInternalLink>
      </>
    )
    return <LoadingBanner content={content} />
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
        <div
          className={'page-container bg-white bordered-container text-center'}
          style={{ paddingTop: '1rem', background: 'var(--bg-gradient-teal)' }}
        >
          <h3>Living Dexes associated to your previous account</h3>
          <p className="text-center">
            These are the living dexes that were associated to your previous account via the email{' '}
            <b>
              <code>{email}</code>
            </b>
            .<br /> You can re-associate them to your current account by clicking on the button
            below.
          </p>
          <GameCardList dexes={dexes} />

          <>
            <ButtonInternalLink
              href={Routes.LivingDex}
              style={{ background: 'none', color: 'black' }}
            >
              Go back
            </ButtonInternalLink>

            <form
              method="post"
              action={Routes.API.LegacyLivingDexes}
              style={{ display: 'inline-block' }}
              onSubmit={e => {
                document.getElementById('confirmbutton')?.setAttribute('disabled', 'true')
              }}
            >
              <input type="hidden" name="action" value="import" />
              <input type="hidden" name="email" value={email} />
              <Button id="confirmbutton" type="submit">
                Confirm and import
              </Button>
            </form>
          </>
        </div>
      </>
    </div>
  )
}

export default Page
