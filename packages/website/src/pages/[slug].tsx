import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { ArticleEntry, Entry, getAllPages, getPageStaticProps, toSortedIndex } from '#/services/cms'
import ArticlePageView from '#/services/cms/ArticlePageView'

export function getStaticPaths(): GetStaticPathsResult {
  const paths = toSortedIndex(getAllPages()).map((page: Entry) => ({
    params: {
      slug: page.slug,
    },
  }))

  return {
    paths: paths,
    fallback: false,
    // fallback=false: show the default 404 page
    // fallback=true: delegate the fallback to getStaticProps (e.g. checking if entry is null)
  }
}

export function getStaticProps(ctx: GetStaticPropsContext): GetStaticPropsResult<any> {
  const slug = ctx.params?.slug as string
  return getPageStaticProps(slug, 60 * 15)
}

const page = ({ entry }: { entry: ArticleEntry | null }) => {
  return <ArticlePageView entry={entry} />
}

export default page
