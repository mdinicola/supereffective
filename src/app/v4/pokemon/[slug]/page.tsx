import LayoutArticle from '@/components/layout/main/LayoutArticle'
import { getAbsUrl } from '@/lib/urls'
import { pokemonIndex } from '@supeffective/dataset'
import type { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type PageProps = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateStaticParams() {
  return pokemonIndex.map((row) => ({
    slug: row.id,
  }))
}

export async function generateMetadata({ params }: PageProps, _parent: ResolvingMetadata): Promise<Metadata> {
  const record = pokemonIndex.find((p) => p.id === params.slug)

  if (!record) {
    return {}
  }

  const parent = await _parent

  const fullUrl = getAbsUrl(`/v4/pokemon/${record.id}`)
  const metaTitle = `${record.name} - ${parent.title?.absolute}`
  const metaDescription = `${record.name}'s Pokédex entry, stats, moves, and location.`
  // const imgUrl = getPokeImgUrl(record.nid, '3d')

  return {
    title: record.name,
    description: metaDescription,
    robots: 'index, follow',
    alternates: {
      canonical: fullUrl,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@supereffectiv',
      title: metaTitle,
      description: metaDescription,
      // images: [imgUrl],
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'article',
      tags: ['pokemon', 'pokedex', 'dex', 'dex-entry'],
      url: fullUrl,
      // images: [imgUrl],
    },
  } satisfies Metadata
}

export default function Page({ params }: PageProps) {
  const slug = params.slug

  if (!slug) {
    notFound()
  }

  const record = pokemonIndex.find((p) => p.id === params.slug)
  if (!record) {
    return notFound()
  }

  return (
    <article>
      <LayoutArticle mainTitle={record.name}>
        <a href={`/v4/pokemon/${params.slug}/opengraph-image`} target="_blank" rel="noreferrer">
          <Image src={`/v4/pokemon/${params.slug}/opengraph-image`} alt={record.name} width={1200} height={630} />
        </a>
        <p>Dex entry for {record.name}</p>
      </LayoutArticle>
    </article>
  )
}
