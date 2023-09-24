import Image from 'next/image'
import { HTMLAttributes } from 'react'

import config from '#/config'
import { classNames } from '#/utils/legacyUtils'

const variantFolder = {
  '2d': 'home2d-icon',
  '3d': 'home3d-icon',
  pixelart: 'gen8-icon',
}

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

  const assetVersion = config.assets.getPokeImgVersion(nid)
  let imageSrc = `${config.assets.imagesUrl}/pokemon/${folder}/${nid}.png?v=${assetVersion}`

  if (nid === 'placeholder') {
    imageSrc = '/assets/gui/placeholders/placeholder-64x64.png'
  }

  return (
    <span className={classes} {...rest}>
      <Image
        loading="lazy"
        unoptimized
        quality={100}
        width={imgW}
        height={imgH}
        className={'pkimg-img-loading'}
        src={imageSrc}
        alt={title || nid}
        onLoadingComplete={imgElem => {
          imgElem.classList.remove('pkimg-img-loading')
        }}
      />
    </span>
  )
}
