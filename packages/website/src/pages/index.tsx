import { getPageStaticProps } from '@app/src/services/cms'
import ArticlePageView, { ArticlePageViewProps } from '@app/src/services/cms/ArticlePageView'

export async function getStaticProps() {
  return getPageStaticProps('index', 60 * 15)
}

export default function Page({ entry }: ArticlePageViewProps) {
  return <ArticlePageView entry={entry} />
}
