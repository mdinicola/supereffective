import { HTMLAttributes } from 'react'
import Image from 'next/image'

import config from '#/config'
import { classNames } from '#/utils/legacyUtils'

const spriteVersion = '20230626-01'

const variantFolder = {
  '2d': 'home2d-icon',
  '3d': 'home3d-icon',
  pixelart: 'gen8-icon',
}

const base64Placeholder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkkAQAAB8AG7jymN8AAAAASUVORK5CYII='
type PkImgFileProps = {
  nid: string
  title?: string
  shiny?: boolean
  variant: '2d' | '3d' | 'pixelart'
} & HTMLAttributes<HTMLSpanElement>

export default function PkImgFile({
  nid,
  shiny,
  variant,
  title,
  className,
  ...rest
}: PkImgFileProps) {
  const folder = variantFolder[variant] + (shiny ? '/shiny' : '/regular')

  let imgW = 64
  let imgH = 64

  if (variant === 'pixelart') {
    imgW = 68
    imgH = 56
  }

  const classes = classNames(
    'pkm-wrapper pkimg-wrapper',
    `pkimg-variant-${variant}`,
    `pkimg-${shiny ? 'shiny' : 'regular'}`,
    className
  )

  let imageSrc = `${config.assets.imagesUrl}/pokemon/${folder}/${nid}.png?v=${spriteVersion}`

  if (nid === 'placeholder') {
    imageSrc = '/assets/gui/placeholders/placeholder-64x64.png'
  }

  return (
    <span className={classes} {...rest}>
      <Image
        placeholder="blur"
        blurDataURL={base64Placeholder}
        loading="lazy"
        quality={100}
        width={imgW}
        height={imgH}
        className={className}
        src={imageSrc}
        alt={title || nid}
      />
    </span>
  )
}
