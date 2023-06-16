import Link from 'next/link'

import { useSession } from '@pkg/auth/lib/hooks/useSession'
import { getGameSetByGameId } from '@pkg/database/repositories/game-sets'
import { canCreateMoreDexes } from '@pkg/database/repositories/living-dexes/legacy'
import { LoadedDex } from '@pkg/database/repositories/living-dexes/legacy/types'

import { Routes } from '#/config/routes'
import { useDexesContext } from '#/features/livingdex/state/LivingDexListContext'
import { GameLogo } from '#/features/livingdex/views/GameLogo'
import { WelcomeContent } from '#/features/livingdex/views/WelcomeContent'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import Button, { ButtonInternalLink } from '#/primitives/legacy/Button/Button'
import { classNameIf, classNames } from '#/utils/legacyUtils'

import styles from './Dashboard.module.css'

export const GameCardList = ({
  dexes,
  linkable,
}: {
  dexes: Array<LoadedDex>
  linkable?: boolean
}) => {
  return (
    <div
      className={classNames(
        styles.gameCardList,
        classNameIf(dexes.length === 1, styles.singleDex),
        classNameIf(linkable, styles.clickable)
      )}
    >
      {dexes.map(dex => (
        <GameCard dex={dex} key={dex.id} linkable={linkable || false} />
      ))}
    </div>
  )
}

export const GameCard = ({ dex, linkable }: { dex: LoadedDex; linkable: boolean }) => {
  const dexLink = `/apps/livingdex/${dex.id}`
  //const socialLinks = dex.id ? <DexSocialLinks shareAsOwner={true} dexId={dex.id}/> : null
  const gameSetId = getGameSetByGameId(dex.gameId).id
  const content = (
    <div
      className={[
        styles.gameCard,
        `bg-gr-teal dex-game-card`,
        `dex-gameset-card-${gameSetId} dex-game-card-${dex.gameId}`,
      ].join(' ')}
    >
      <div className={styles.gameCardBody}>
        <div className={styles.gameCardImage}>
          <GameLogo game={dex.gameId} size={180} asSwitchIcon={true} />
        </div>
        <div className={styles.gameCardStatsWrapper}>
          <div className={styles.gameCardStats}>
            {dex.boxes.length > 2 && (
              <span>
                <i className="icon-pkg-box" /> {dex.boxes.length / 2}*
              </span>
            )}
            <span>
              <i className="icon-pkg-pokeball-outlined" /> {dex.caughtRegular} / {dex.totalRegular}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
  return linkable ? <Link href={dexLink}>{content}</Link> : <span>{content}</span>
}

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
        {/* <div>
        <label>
          <small>Email linked to the Github/Twitter/Google account you used:</small>
        </label>
        <TextInput name="email" placeholder="Email" type="email" />
      </div> */}
        <div>
          <Button type="submit" className="btn btn-primary">
            Restore
          </Button>
        </div>
      </form>
    </div>
  )
}

const AuthenticatedDashboardContainer = (): JSX.Element => {
  const { dexes, dexesLoading } = useDexesContext()

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

  return (
    <div className={'page-container dex-count-' + dexes.length}>
      <h2 className={'text-center main-title-outlined'}>
        <i className="icon-pkg-box" style={{ textShadow: 'none' }} /> Living Dex Tracker
      </h2>
      <div className="text-center" style={{ margin: '0 0 2rem 0', opacity: 1 }}>
        <GameCardList dexes={dexes} linkable />
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
        {canCreateMoreDexes(dexes) && (
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

export const Dashboard = () => {
  const session = useSession()

  if (session.isLoading()) {
    return <LoadingBanner />
  }

  if (!session.isAuthenticated()) {
    return <WelcomeContentContainer />
  }

  return <AuthenticatedDashboardContainer />
}
