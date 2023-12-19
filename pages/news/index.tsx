import PageMeta from '@/features/pages/components/PageMeta'
import ArticlePageView from '@/features/pages/views/ArticlePageView'
import { getArticleRepository } from '@/lib/repositories/pages/getArticleRepository'
import { getPageRepository } from '@/lib/repositories/pages/getPageRepository'
import { toSortedIndex } from '@/lib/repositories/pages/toSortedIndex'
import { ArticleEntry } from '@/lib/repositories/pages/types'
import { getFullUrl } from '@/lib/utils/nextjs/urls'

export async function getStaticProps() {
  const entries = toSortedIndex(getArticleRepository().getAll())
  const indexEntry = getPageRepository().getBySlug('news')
  return {
    props: {
      entries,
      indexEntry,
    },
    revalidate: 60 * 5, // 5 minutes
  }
}

const IndexPage = ({
  entries,
  indexEntry,
}: {
  entries: Array<ArticleEntry>
  indexEntry: ArticleEntry
}) => {
  return (
    <>
      <PageMeta
        metaTitle={indexEntry.metaTitle}
        metaDescription={indexEntry.metaDescription}
        robots={indexEntry.robots}
        imageUrl={indexEntry.bannerImageUrl}
        ogType="website"
        canonicalUrl={getFullUrl('news')}
        lang={'en'}
      />
      <div className="page-container">
        <section className="news-index">
          {entries.map((entry: ArticleEntry) => {
            return <ArticlePageView key={entry.slug} entry={entry} isExcerpt={true} />
          })}
          <style jsx>{`
            .news-index :global(article) {
              margin-bottom: 1rem;
            }
          `}</style>
        </section>
      </div>
    </>
  )
}

export default IndexPage
