import LayoutArticle from '@/components/layout/main/LayoutArticle'
import { findMdxEntryBySlug, getAllMdxEntriesByType } from '@/lib/mdx/mdx-loader'
import { type MDXEntryMetadata, MDXEntryType } from '@/lib/mdx/types'
import { buildPageMetadata } from '@/lib/pages'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound, redirect } from 'next/navigation'

type PageProps = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const allStaticPages = getAllMdxEntriesByType<MDXEntryMetadata>(MDXEntryType.Page).filter(
  (page) => page.isAutogenerated !== false,
)

export async function generateStaticParams() {
  return allStaticPages.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: PageProps, _parent: ResolvingMetadata): Promise<Metadata> {
  const page = findMdxEntryBySlug(allStaticPages, params.slug)

  if (!page) {
    return {}
  }

  return buildPageMetadata(page)
}

export default function Page({ params }: PageProps) {
  const slug = params.slug

  if (slug === 'index') {
    redirect('/v4')
  }

  if (!slug) {
    notFound()
  }

  const page = findMdxEntryBySlug(allStaticPages, slug)
  if (!page) {
    return notFound()
  }

  return <LayoutArticle page={page} />
}