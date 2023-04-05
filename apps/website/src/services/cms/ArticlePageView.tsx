import { getFullUrl } from '@app/src/config/env'
import { ArticlePage } from '@app/src/domains/legacy/news/views/ArticleEntry'
import { LoadingBanner } from '@app/src/layouts/LegacyLayout/LoadingBanner'
import { Entry } from '@app/src/services/cms'
import { cleanupSpaces as clean } from '@app/src/utils/strings'
import MDXContent from './MDXContent'

export type ArticlePageViewProps = {
  entry: Entry | null
  basePath?: string
  isExcerpt?: boolean
}

export default function ArticlePageView({ entry, isExcerpt = false }: ArticlePageViewProps) {
  if (!entry) {
    return <LoadingBanner />
  }

  const canonicalSlug = entry.slug === 'index' ? '' : entry.url
  const canonicalUrl = getFullUrl(canonicalSlug)
  const content = isExcerpt ? (
    <div dangerouslySetInnerHTML={{ __html: entry.summary?.html || '' }} />
  ) : (
    <MDXContent content={entry.body.code} />
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
      publishDate={entry.type !== 'Page' ? new Date(entry.createdAt) : undefined}
      bannerImageUrl={entry.bannerImageUrl}
      category={entry.category}
      tags={entry.tags}
      isExcerpt={isExcerpt === true}
      enableComments={entry.enableComments === true}
      enableSharing={entry.enableSharing === true}
      videoUrl={entry.videoUrl}
    >
      {content}
    </ArticlePage>
  )
}
