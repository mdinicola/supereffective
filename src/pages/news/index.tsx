import PageMeta from '@/v3/features/pages/components/PageMeta'
import { getArticleRepository } from '@/v3/features/pages/repository/getArticleRepository'
import { getPageRepository } from '@/v3/features/pages/repository/getPageRepository'
import { toSortedIndex } from '@/v3/features/pages/repository/toSortedIndex'
import { ArticleEntry } from '@/v3/features/pages/repository/types'
import ArticlePageView from '@/v3/features/pages/views/ArticlePageView'
import { getFullUrl } from '@/v3/lib/utils/urls'

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

const IndexPage = ({ entries, indexEntry }: { entries: Array<ArticleEntry>; indexEntry: ArticleEntry }) => {
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
