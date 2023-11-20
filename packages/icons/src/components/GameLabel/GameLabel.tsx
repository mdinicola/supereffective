import { pokemonGamesMap } from '@supeffective/dataset'

import type { PropsOf, Size } from '@/types'
import { cn } from '@/utils'

import { gameLabelRecipe } from './GameLabel.styles'

export type GameLabelProps = {
  gameId: string
  colored?: boolean
  rounded?: boolean
  size?: Size
} & PropsOf<'span'>

export function GameLabel(props: GameLabelProps) {
  const { gameId: recordId, colored, rounded, size = 'sm', className, ...rest } = props
  const record = pokemonGamesMap.get(recordId)
  if (!record) {
    throw new Error(`No type with id ${recordId}`)
  }

  return (
    <span
      title={record.name}
      data-game={record.id}
      className={cn(
        gameLabelRecipe({
          gameId: record.id as any,
          colored,
          rounded,
          size,
        }),
        className
      )}
      {...rest}
    >
      {record.id}
    </span>
  )
}
