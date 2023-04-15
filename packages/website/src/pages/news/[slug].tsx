import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next'

import { getArticleRepository } from '@pkg/database/src/pages/getArticleRepository'
import { toSortedIndex } from '@pkg/database/src/pages/toSortedIndex'
import { ArticleEntry, Entry } from '@pkg/database/src/pages/types'

import ArticlePageView from '#/features/pages/views/ArticlePageView'

export function getStaticPaths(): GetStaticPathsResult {
  const paths = toSortedIndex(getArticleRepository().getAll()).map((page: Entry) => ({
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
  return getArticleRepository().getStaticProps(slug, 60 * 15)
}

const page = ({ entry }: { entry: ArticleEntry | null }) => {
  return <ArticlePageView entry={entry} />
}

export default page
