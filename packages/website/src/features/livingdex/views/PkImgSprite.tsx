import Image from 'next/image'

interface PkImgSpriteProps {
  slug: string
  title: string
  shiny: boolean
  pixelArt: boolean // false = home renders, true = menu icons
  classNameExtra: string
}

/**
 * @deprecated Use PkImgFile instead
 */
export default function PkImgSprite(props: PkImgSpriteProps) {
  let prefix = 'pkm'
  let imgW = 64
  let imgH = 64

  if (props.pixelArt) {
    prefix = 'pkmi'
    imgW = 68
    imgH = 56
  }

  let src = `placeholder-${imgW}x${imgH}.png`

  let _classNameExtra = props.classNameExtra.length > 0 ? ' ' + props.classNameExtra : ''
  let classNameExtraWrapper =
    props.classNameExtra.length > 0 ? props.classNameExtra + '-wrapper' : ''
  let className = `${prefix} ${prefix}-${props.slug}` + _classNameExtra
  if (props.shiny) {
    className += ' shiny'
  }
  const dropshadow = {} //{filter: 'var(--dropshadow-black)'}
  return (
    <span className={prefix + '-wrapper' + classNameExtraWrapper} style={dropshadow}>
      <Image
        width={imgW}
        height={imgH}
        className={className}
        src={'/assets/gui/placeholders/' + src}
        alt={props.title}
      />
    </span>
  )
}
