import Image from 'next/image'

import config from '@/lib/config'
import { SpanAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { css } from '@/styled-system/css'

export type PokeImgProps = SpanAttributes<{
  nid: string | null
  width?: number
  height?: number
  variant: 'gen8-icon' | 'home3d-icon' | 'home2d-icon'
  shiny?: boolean
}>

export function PokeImg({
  nid,
  variant,
  shiny,
  width: widthProp,
  height: heightProp,
  className,
  ...rest
}: PokeImgProps): JSX.Element {
  const shinyDir = shiny ? 'shiny' : 'regular'
  const baseName = nid ? `${variant}/${shinyDir}/${nid}.png` : `${variant}/unknown-sv.png`
  const relativePath = `images/pokemon/${baseName}?v=${config.assets.version}`
  const tileImg = `${config.assets.baseUrl}/${relativePath}`
  const pixelatedClass = css({ imageRendering: 'pixelated' })
  const semiGrayscaleClass = css({
    filter: 'grayscale(100%)',
    opacity: 0.5,
  })

  const baseSize = 68 * 2
  let width = baseSize
  let height = baseSize
  if (variant === 'gen8-icon') {
    width = 68 * 2
    height = 56 * 2
  }
  if (widthProp) {
    width = widthProp
  }
  if (heightProp) {
    height = heightProp
  }
  function _renderImg() {
    return (
      <Image
        src={tileImg}
        data-url={tileImg}
        alt={nid || 'unknown'}
        width={width}
        height={height}
        className={cn(
          css({
            display: 'inline-flex',
            height: 'auto',
            maxWidth: '100%',
          }),
          [variant === 'gen8-icon', pixelatedClass]
        )}
      />
    )
  }

  return (
    <span
      title={nid + '.png'}
      className={cn(
        css({
          display: 'inline-flex',
          verticalAlign: 'top',
        }),
        className,
        [nid === null, semiGrayscaleClass]
      )}
      {...rest}
    >
      {_renderImg()}
    </span>
  )
}
