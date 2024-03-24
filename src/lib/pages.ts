import type { Metadata } from 'next'
import type { Thing, WithContext } from 'schema-dts'
import type { MDXPage } from './mdx/types'
import { getAbsUrl } from './urls'

export function buildPageMetadata(page: MDXPage): Metadata {
  const canonicalUrl = getAbsUrl(page.slug)
  const truncatedTitle = (page.metaTitle || '').substring(0, 50)
  const truncatedDescription = (page.metaDescription || '').substring(0, 150)
  const metaRobots = Array.isArray(page.robots) ? page.robots : [page.robots ? page.robots : 'index, follow']

  return {
    title: `${page.metaTitle}`,
    description: page.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: metaRobots.join(', '),
    twitter: {
      card: 'summary_large_image',
      site: '@supereffectiv',
      title: truncatedTitle,
      description: truncatedDescription,
      images: page.bannerImageUrl ? [page.bannerImageUrl] : undefined,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: 'article',
      url: canonicalUrl,
      images: page.bannerImageUrl ? [page.bannerImageUrl] : [],
    },
  } satisfies Metadata
}

export function buildPageJsonLd(page: MDXPage, jsonLdType: 'WebPage' | 'NewsArticle'): WithContext<Thing> {
  const canonicalUrl = getAbsUrl(page.slug)
  const isoPublishDate = page.publishedAt ? new Date(page.publishedAt).toISOString() : undefined
  const isoUpdateDate = page.updatedAt ? new Date(page.updatedAt).toISOString() : undefined

  return {
    '@context': 'https://schema.org',
    '@type': jsonLdType,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    url: canonicalUrl,
    headline: page.title?.replace(/"/g, '\\"'),
    image: page.bannerImageUrl ? [page.bannerImageUrl] : undefined,
    datePublished: isoPublishDate,
    dateModified: isoUpdateDate,
    author: {
      '@type': 'Person',
      name: 'Javi Aguilar',
      url: getAbsUrl('/about'),
      contactPoint: {
        '@type': 'ContactPoint',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'supereffective.gg',
      logo: {
        '@type': 'ImageObject',
        url: getAbsUrl('/images/logo/logo.png'),
      },
      contactPoint: {
        '@type': 'ContactPoint',
      },
    },
  } satisfies WithContext<Thing>
}
