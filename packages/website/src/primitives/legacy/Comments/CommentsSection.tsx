import * as React from 'react'

import { ButtonLink } from '@app/src/primitives/legacy/Button/Button'

export default function CommentsSection({
  pageUrl,
  encodedTitle,
}: {
  pageUrl: string
  encodedTitle: string
}) {
  const encodedUrl = encodeURIComponent(pageUrl || '')
  return (
    <section className={'inner-container text-center'}>
      <ButtonLink
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        title={'Twitter'}
      >
        <i className={'icon icon-brand-twitter'} /> Discuss on Twitter
      </ButtonLink>
    </section>
  )
}
