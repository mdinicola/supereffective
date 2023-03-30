import { ArticleEntry } from '@app/src/domains/legacy/news/views/ArticleEntry'
import PageMeta from '@app/src/layouts/LegacyLayout/PageMeta'
import { abs_url } from '@app/src/primitives/legacy/Link/Links'
import {
  CmsEntry,
  CmsEntryType,
  getCmsEntries,
  getCmsEntry,
  transformRichContent,
} from '@app/src/services/legacy/cms/HeadlessCms'

export async function getStaticProps() {
  const entries = await getCmsEntries(CmsEntryType.NewsArticle, '/news/', '-sys.createdAt', 10)
  const homeEntry = await getCmsEntry(CmsEntryType.Page, '__news__', '/news')
  return {
    props: {
      entries,
      homeEntry,
    },
    revalidate: 60 * 5, // 5 minutes
  }
}

const IndexPage = ({ entries, homeEntry }: { entries: Array<CmsEntry>; homeEntry: CmsEntry }) => {
  return (
    <>
      <PageMeta
        metaTitle={homeEntry.metaTitle}
        metaDescription={homeEntry.metaDescription}
        canonicalUrl={abs_url('/')}
        lang={'en'}
      />
      <div className="page-container">
        <section className="news-index">
          {entries.map((entry: CmsEntry) => {
            return (
              <ArticleEntry
                id={entry.id}
                key={entry.id}
                title={entry.title}
                canonicalUrl={entry.canonicalUrl}
                publishDate={new Date(entry.publishDate)}
                bannerImage={entry.bannerImage}
                category={entry.category}
                tags={entry.tags}
                isExcerpt={true}
              >
                {transformRichContent(entry.summary)}
              </ArticleEntry>
            )
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
