import Image from 'next/image'

import config from '@/lib/config'
import { SpanAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { css } from '@/styled-system/css'

export type RibbonImgProps = SpanAttributes<{
  id: string
  variant?: 'gen9-style'
}>

export function RibbonImg({
  id,
  variant = 'gen9-style',
  className,
  ...rest
}: RibbonImgProps): JSX.Element {
  const tileImg = `${config.assets.baseUrl}/images/ribbons/${variant}/${id}.png`
  const baseSize = 68 * 2
  let width = baseSize
  let height = baseSize

  return (
    <span
      title={id + '.png'}
      className={cn(
        css({
          display: 'inline-block',
          verticalAlign: 'top',
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
