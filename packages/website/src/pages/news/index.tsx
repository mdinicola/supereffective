import { getFullUrl } from '@app/src/config/env'
import PageMeta from '@app/src/layouts/LegacyLayout/PageMeta'
import { ArticleEntry, getAllArticles, getPageBySlug, toSortedIndex } from '@app/src/services/cms'
import ArticlePageView from '@app/src/services/cms/ArticlePageView'

export async function getStaticProps() {
  const entries = toSortedIndex(getAllArticles())
  const indexEntry = getPageBySlug('news')
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
