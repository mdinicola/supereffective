import { GetStaticPropsContext } from 'next'

import { ArticlePage } from '@app/src/domains/legacy/news/views/ArticleEntry'
import { LoadingBanner } from '@app/src/layouts/LegacyLayout/LoadingBanner'
import {
  CmsEntry,
  CmsEntryType,
  getCmsEntry,
  transformRichContent,
} from '@app/src/services/legacy/cms/HeadlessCms'

export async function getStaticProps(ctx: GetStaticPropsContext) {
  // If you request this page with the preview mode cookies set, then
  // getStaticProps will be called at request time instead of build time.
  //
  // If you’re also using getStaticPaths, then context.params will also be available.
  //
  // - context.preview will be true
  // - context.previewData will be the same as the argument used for `setPreviewData` in the API.
  //

  const entry = await getCmsEntry(CmsEntryType.Page, '__home__', '/', ctx.preview)

  if (!entry) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  return {
    props: {
      entry: entry,
    },
    revalidate: 60 * 15, // 15 min, see: https://www.youtube.com/watch?v=X0-6lyxj1_Q
  }
}

const page = ({ entry }: { entry: CmsEntry | null }) => {
  if (!entry) {
    return <LoadingBanner />
  }
  // const publishDate = new Date(entry.publishDate)
  return (
    <ArticlePage
      meta={{
        metaTitle: entry.metaTitle,
        metaDescription: entry.metaDescription,
        imageUrl: entry.bannerImage?.url,
        canonicalUrl: entry.canonicalUrl,
        lang: 'en',
        ogType: 'article',
      }}
      id={entry.id}
      title={entry.title}
      canonicalUrl={entry.canonicalUrl}
      bannerImage={
        entry.bannerImage
          ? {
              url: entry.bannerImage.url,
              alt: entry.bannerImage.alt,
              width: entry.bannerImage.width,
              height: entry.bannerImage.height,
            }
          : null
      }
      isExcerpt={false}
      enableComments={false}
      enableSharing={false}
    >
      {transformRichContent(entry.content)}
    </ArticlePage>
  )
}

export default page
