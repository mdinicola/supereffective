import appConfig from '@/config/app'
import { getAbsUrl } from '@/lib/urls'
import type { Metadata } from 'next'

const fullUrl = getAbsUrl('/v4/pokemon/')
const metaTitle = 'Pokémon'
const metaDescription = 'Pokédex entries, stats, moves, and locations for all Pokémon.'

export const metadata: Metadata = {
  title: {
    template: `%s - ${metaTitle} - ${appConfig.siteName}`,
    default: metaTitle,
  },
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
    images: [],
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'article',
    tags: ['pokemon', 'pokedex', 'dex'],
    url: fullUrl,
    images: [],
  },
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
