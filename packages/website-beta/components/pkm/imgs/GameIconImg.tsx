import Image from 'next/image'

import config from '@/lib/config'
import { SpanAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { css } from '@/styled-system/css'

export type GameIconImgProps = SpanAttributes<{ id: string }>

export function GameIconImg({ id, className, ...rest }: GameIconImgProps): JSX.Element {
  const tileImg = `${config.assets.baseUrl}/images/games/gameset-icons/${id}.png`
  const baseSize = 80
  let width = baseSize
  let height = baseSize

  return (
    <span
      title={id}
      className={cn(
        css({
          display: 'inline-block',
          verticalAlign: 'top',
          height: 'auto',
          fontStyle: 'normal',
          maxWidth: '100%',
        }),
        className
      )}
      {...rest}
    >
      <Image
        src={tileImg}
        alt={id}
        width={width}
        height={height}
        className={css({
          display: 'inline-block',
          height: 'auto',
        })}
      />
    </span>
  )
}
