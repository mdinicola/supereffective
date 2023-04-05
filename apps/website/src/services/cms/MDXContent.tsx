import { ImgHTMLAttributes } from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import NextImage from 'next/image'

function ResponsiveImage(props: ImgHTMLAttributes<HTMLImageElement>): JSX.Element {
  return (
    <span className="responsive-img">
      <NextImage src={props.src as string} alt={props.alt || ''} fill />
    </span>
  )
}

export default function MDXContent({ content }: { content: string | undefined }): JSX.Element {
  const MDXContent = useMDXComponent(content ?? '')

  return <MDXContent components={{ img: ResponsiveImage }} />
}
