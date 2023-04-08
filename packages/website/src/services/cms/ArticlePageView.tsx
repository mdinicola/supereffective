import React from 'react'
import { getFullUrl } from '#/config/env'
import { ArticlePage } from '#/features/legacy/news/views/ArticleEntry'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import { Entry, EntryType } from '#/services/cms/types'
import { cleanupSpaces as clean } from '#/utils/strings'
import MDXContent from './MDXContent'

export type ArticlePageViewProps = {
  entry: Entry | null
  isExcerpt?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function ArticlePageView({
  entry,
  isExcerpt = false,
  ...rest
}: ArticlePageViewProps) {
  if (!entry) {
    return <LoadingBanner />
  }

  const canonicalSlug = entry.slug === 'index' ? '' : entry.url
  const canonicalUrl = getFullUrl(canonicalSlug)
  const content = isExcerpt ? (
    <div dangerouslySetInnerHTML={{ __html: entry.summary || '' }} />
  ) : (
    <MDXContent content={entry.body} />
  )

  return (
    <ArticlePage
      meta={{
        metaTitle: clean(entry.metaTitle),
        metaDescription: clean(entry.metaDescription),
        robots: entry.robots,
        imageUrl: entry.bannerImageUrl ? getFullUrl(entry.bannerImageUrl) : undefined,
        canonicalUrl: canonicalUrl,
        lang: 'en',
        ogType: entry.type === 'Article' ? 'article' : 'website',
      }}
      title={clean(entry.title)}
      relativeUrl={entry.url}
      canonicalUrl={canonicalUrl}
      publishDate={entry.type !== EntryType.Page ? entry.createdAt : undefined}
      bannerImageUrl={entry.bannerImageUrl}
      category={entry.category}
      tags={entry.tags}
      isExcerpt={isExcerpt === true}
      enableComments={entry.enableComments === true}
      enableSharing={entry.enableSharing === true}
      videoUrl={entry.videoUrl}
      {...rest}
    >
      {content}
    </ArticlePage>
  )
}
