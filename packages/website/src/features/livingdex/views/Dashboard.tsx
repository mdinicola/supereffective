import { useState } from 'react'

import { useSession } from '@pkg/auth/lib/hooks/useSession'
import { LivingDexResolvedUserLimits } from '@pkg/database/repositories/living-dexes/legacy/types'

import { Routes } from '#/config/routes'
import { useDexesContext } from '#/features/livingdex/state/LivingDexListContext'
import { GameCardList } from '#/features/livingdex/views/gameCard/GameCard'
import { WelcomeContent } from '#/features/livingdex/views/WelcomeContent'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import Button, { ButtonInternalLink } from '#/primitives/legacy/Button/Button'

import styles from './Dashboard.module.css'

const WelcomeContentContainer = (): JSX.Element => {
  return (
    <div className={'page-container dex-count-0'}>
      <WelcomeContent />
    </div>
  )
}

const ImportLegacyDexesContainer = (): JSX.Element => {
  return (
    <div className={styles.importer}>
      <form method="GET" action={Routes.LegacyLivingDexImport}>
        <p>
          ℹ️ Did you previously log in with Github, Twitter or Google and created Living Dexes with
          those accounts? <br />
          <br />
          If you are logged in with the same email linked to the social account you used in the
          past, you can restore your previous dexes and link them to your current user.
        </p>
        <div>
          <Button type="submit" className="btn btn-primary">
            Restore
          </Button>
        </div>
      </form>
    </div>
  )
}

const AuthenticatedDashboardContainer = ({
  limits,
}: {
  limits: LivingDexResolvedUserLimits | null
}): JSX.Element => {
  const { dexes, dexesLoading } = useDexesContext()
  const [listVariant, setListVariant] = useState<'grid' | 'list'>('list')

  if (dexesLoading) {
    return <LoadingBanner />
  }

  if (dexes === undefined || dexes.length === 0) {
    return (
      <>
        <ImportLegacyDexesContainer />
        <WelcomeContentContainer />
      </>
    )
  }

  const remainingDexes = limits?.remainingDexes ?? 0
  const canAddMoreDexes = remainingDexes > 0

  return (
    <div className={'page-container dex-count-' + dexes.length}>
      <h2 className={'text-center main-title-outlined'}>
        <i className="icon-pkg-box" style={{ textShadow: 'none' }} /> Living Dex Tracker
      </h2>
      <div className="text-center" style={{ margin: '0 0 2rem 0', opacity: 1 }}>
        <GameCardList variant={listVariant} dexes={dexes} linkable />
      </div>
      <p className="text-center" style={{ maxWidth: '500px', margin: '-1rem auto 2rem auto' }}>
        <br />
        <small>
          <i>
            <sup>(*) </sup> boxes required for each mode (regular or shiny).
          </i>
        </small>
      </p>
      <div className="text-center" style={{ margin: '0 0 4rem 0', opacity: 1, fontSize: '1.5rem' }}>
        {canAddMoreDexes && (
          <ButtonInternalLink href={'/apps/livingdex/new'} inverted={false}>
            + Add Game
          </ButtonInternalLink>
        )}
        <ButtonInternalLink href={'/apps/livingdex/missing'} inverted={true}>
          <i className="icon-pkg-pokeball-outlined" /> View Missing Pokémon
        </ButtonInternalLink>
      </div>
      <ImportLegacyDexesContainer />
      <WelcomeContent />
    </div>
  )
}

export const Dashboard = ({ limits }: { limits: LivingDexResolvedUserLimits | null }) => {
  const session = useSession()

  if (session.isLoading()) {
    return <LoadingBanner />
  }

  if (!session.isAuthenticated()) {
    return <WelcomeContentContainer />
  }

  return <AuthenticatedDashboardContainer limits={limits} />
}
