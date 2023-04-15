import Image from 'next/image'

import { getGameRepository } from '@pkg/database/src/games/getGameRepository'
import { GameId } from '@pkg/database/src/games/types'

import styles from './GameLogo.module.css'

interface GameLogoProps {
  game: GameId
  size: number
  asSwitchIcon: boolean
  ext?: string

  [key: string]: any
}

export const GameLogo = ({
  game,
  size = 180,
  asSwitchIcon = false,
  ext = '.jpeg',
  ...props
}: GameLogoProps) => {
  const gameData = getGameRepository().getById(game)
  const path = asSwitchIcon ? `tiles/${gameData.id}` : gameData.id
  return (
    <Image
      className={styles.gameLogoImg}
      width={size}
      height={size}
      src={'/assets/games/' + path + ext}
      alt={gameData.name}
      {...props}
    />
  )
}
