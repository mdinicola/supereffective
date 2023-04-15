import PluginMDXContent from '@pkg/mdx/src/components/MDXContent'

import Button from '#/primitives/legacy/Button/Button'

const mdxComponents = {
  button: Button,
}

export default function MDXContent({
  content,
}: {
  content: string | undefined
}): JSX.Element | null {
  if (!content) return null

  return <PluginMDXContent components={mdxComponents} content={content} />
}
