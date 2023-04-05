import {
  defineComputedFields,
  defineDocumentType,
  FieldDefs,
  makeSource,
} from 'contentlayer/source-files'

const commonFields: FieldDefs = {
  id: {
    type: 'string',
  },
  title: {
    type: 'string',
    required: true,
  },
  slug: {
    type: 'string',
    required: true,
  },
  createdAt: {
    type: 'date',
    required: true,
  },
  updatedAt: {
    type: 'date',
  },
  publishedAt: {
    type: 'date',
  },
  isDraft: {
    type: 'boolean',
    default: false,
  },
  summary: {
    type: 'markdown',
  },
  bannerImageUrl: {
    type: 'string',
  },
  videoUrl: {
    type: 'string',
  },
  metaTitle: {
    type: 'string',
    required: true,
  },
  metaDescription: {
    type: 'string',
    required: true,
  },
  robots: {
    type: 'string',
  },
  enableComments: {
    type: 'boolean',
  },
  enableSharing: {
    type: 'boolean',
  },
  isAutogenerated: {
    type: 'boolean',
  },
  category: {
    type: 'string',
  },
  tags: {
    type: 'list',
    of: {
      type: 'string',
    },
  },
}

export const Page = defineDocumentType<'Page'>(() => ({
  name: 'Page',
  filePathPattern: `pages/**/*.mdx`,
  description: 'A page',
  contentType: 'mdx',
  fields: commonFields,
  computedFields: defineComputedFields<'Page'>({
    url: {
      type: 'string',
      resolve: entry => `/${entry.slug}`,
    },
  }),
}))

export const Article = defineDocumentType<'Article'>(() => ({
  name: 'Article',
  filePathPattern: `articles/**/*.mdx`,
  description: 'A news article',
  contentType: 'mdx',
  fields: commonFields,
  computedFields: defineComputedFields<'Article'>({
    url: {
      type: 'string',
      resolve: entry => `/news/${entry.slug}`,
    },
  }),
}))

export default makeSource({
  contentDirPath: '../../cms',
  documentTypes: [Page, Article],
})
