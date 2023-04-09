import { ImgHTMLAttributes } from 'react'
import ReactMarkdown, { Components } from 'react-markdown'

import NextImage from 'next/image'

function ResponsiveImage(props: ImgHTMLAttributes<HTMLImageElement>): JSX.Element {
  return (
    <span className="responsive-img">
      <NextImage src={props.src as string} alt={props.alt || ''} fill />
    </span>
  )
}

const defaultComponents = {
  img: ResponsiveImage,
}

export default function MDXContent({
  content,
  components,
}: {
  content: string | undefined
  components?: Components
}): JSX.Element | null {
  if (!content) return null

  components = components ? { ...defaultComponents, ...components } : defaultComponents

  return <ReactMarkdown components={components}>{content}</ReactMarkdown>
}
