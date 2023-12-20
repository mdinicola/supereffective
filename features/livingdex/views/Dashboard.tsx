import { useState } from 'react'

import { useDexesContext } from '@/features/livingdex/state/LivingDexListContext'
import { GameCardList } from '@/features/livingdex/views/gameCard/GameCard'
import { WelcomeContent } from '@/features/livingdex/views/WelcomeContent'
import { useSession } from '@/lib/auth/hooks/useSession'
import { LoadingBanner } from '@/lib/components/layout/panels/LoadingBanner'
import { ButtonInternalLink } from '@/lib/components/legacy/Button/Button'
import { LivingDexResolvedUserLimits } from '@/lib/repositories/living-dexes/legacy/types'

const WelcomeContentContainer = (): JSX.Element => {
  return (
    <div className={'page-container dex-count-0'}>
      <WelcomeContent />
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
