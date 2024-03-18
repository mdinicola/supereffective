import DetailsGroup from '@/components/primitives/DetailsGroup'
import { parseMdxComponent } from '@/lib/mdx/mdx-parser'
import NextImage from 'next/image'
import type { ImgHTMLAttributes } from 'react'
import cls from './MdxRenderer.module.scss'

function ResponsiveImage(props: ImgHTMLAttributes<HTMLImageElement>): JSX.Element {
  return (
    <figure className={cls.rimg}>
      <NextImage src={props.src as string} alt={props.alt || ''} fill />
    </figure>
  )
}

const defaultComponents = {
  img: ResponsiveImage,
  DetailsGroup: DetailsGroup,
  // button: Button,
}

type MdxContentComponent = ReturnType<typeof parseMdxComponent>
type MdxContentProps = Parameters<MdxContentComponent>[0] & {
  content: string
}

export default function MdxRenderer(props: MdxContentProps): ReturnType<MdxContentComponent> {
  const Content = parseMdxComponent(props.content)
  return <Content components={props.components ?? defaultComponents} />
}
