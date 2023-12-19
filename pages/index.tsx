import ArticlePageView, { ArticlePageViewProps } from '@/features/pages/views/ArticlePageView'
import { getPageRepository } from '@/lib/repositories/pages/getPageRepository'

export async function getStaticProps() {
  return getPageRepository().getStaticProps('index', 60 * 15)
}

export default function Page({ entry }: ArticlePageViewProps) {
  return <ArticlePageView className="homepage" entry={entry} />
}
