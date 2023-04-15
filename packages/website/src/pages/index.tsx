import { getPageRepository } from '@pkg/database/src/pages/getPageRepository'

import ArticlePageView, { ArticlePageViewProps } from '#/features/pages/views/ArticlePageView'

export async function getStaticProps() {
  return getPageRepository().getStaticProps('index', 60 * 15)
}

export default function Page({ entry }: ArticlePageViewProps) {
  return <ArticlePageView className="homepage" entry={entry} />
}
