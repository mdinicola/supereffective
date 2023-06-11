import React from 'react'

import { useSession } from '@pkg/auth/lib/hooks/useSession'
import { getGameById } from '@pkg/database/repositories/games'
import { GameId } from '@pkg/database/repositories/games/ids'
import { getAvailableGames } from '@pkg/database/repositories/living-dexes/legacy/gameAvailability'
import { getPresetsForGame } from '@pkg/database/repositories/living-dexes/legacy/presets'
import { PresetDex } from '@pkg/database/repositories/living-dexes/legacy/presets/types'

import { useDexesContext } from '#/features/livingdex/state/LivingDexListContext'
import { GameLogo } from '#/features/livingdex/views/GameLogo'
import { useScrollToLocation } from '#/hooks/useScrollToLocation'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import { UnauthenticatedBanner } from '#/layouts/LegacyLayout/UnauthenticatedBanner'
import { ButtonInternalLink } from '#/primitives/legacy/Button/Button'
import { classNameIf, classNames } from '#/utils/legacyUtils'

import styles from './GamePresetSelector.module.css'

export const GamePresetSelector = () => {
  const auth = useSession()
  const [selectedGame, setSelectedGame] = React.useState<GameId | null>(null)
  const { dexes, dexesLoading } = useDexesContext()

  useScrollToLocation()

  if (auth.isLoading()) {
    return <LoadingBanner />
  }

  if (!auth.isAuthenticated()) {
    return <UnauthenticatedBanner />
  }

  if (dexesLoading || dexes === null) {
    return <LoadingBanner />
  }

  const gameSelectors = (
    <div className={styles.games}>
      {getAvailableGames(dexes).map((gameId: GameId, index) => {
        const game = getGameById(gameId)
        const gameClasses = classNames(
          styles.gameLogo,
          classNameIf(game.id === selectedGame, styles.selected)
        )
        return (
          <div
            key={index}
            title={game.name}
            className={gameClasses}
            onClick={() => {
              window.location.hash = `#presets`
              setSelectedGame(game.id)
            }}
          >
            <GameLogo game={game.id} size={220} asSwitchIcon={true} />
          </div>
        )
      })}
    </div>
  )

  let selectedGamePresets: PresetDex[] = []
  if (selectedGame) {
    selectedGamePresets = Object.values(getPresetsForGame(selectedGame))
  }

  return (
    <div className="page-container">
      <div className="inner-container bordered-container bg-purple-light">
        <div className={'inner-container bg-white'}>
          <h2>
            <i className={'icon-pkg-box-home'} />
            Create a new Living Pokédex
          </h2>
          <b>Select a game and then a preset</b> for your Living Pokédex. You can select any of them
          to take a quick look and come back if you want to change your mind. Changes won't be saved
          until you hit the "Save" button.
          <br />
          <br />
          You can only create one Living Pokédex per game set. This means that you can only have one
          for each set: one for HOME, one for Sword or Shield, one for Brilliant Diamong or Shining
          Pearl, and so on.
        </div>
        <div className={styles.selector + ' inner-container bg-purple'}>
          {gameSelectors}
          {selectedGame && (
            <div id={'presets'} className={styles.presets}>
              <div className={'text-center'}>
                <div className={styles.gameTitle}>Pokémon {getGameById(selectedGame).name}</div>
              </div>
              {selectedGamePresets
                .filter(p => !p.isHidden)
                .map((p, index) => (
                  <div key={index} className={styles.preset + ' inner-container bg-beige'}>
                    <div className={styles.presetName}>
                      <i className={'icon-sync_alt'} /> {p.name}
                    </div>
                    <div className={styles.presetDescription}>{p.description}</div>
                    <div className={'text-right'}>
                      <ButtonInternalLink
                        href={`?game=${selectedGame}&preset=${p.id}`}
                        className={styles.selectBtn}
                      >
                        Select this preset
                      </ButtonInternalLink>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
        {dexes.length > 0 && (
          <div className={'text-center'}>
            <br />
            <ButtonInternalLink href="/apps/livingdex">
              Go to your existing Dexes
            </ButtonInternalLink>
          </div>
        )}
      </div>
    </div>
  )
}
