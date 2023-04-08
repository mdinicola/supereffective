import mdxRefresh from '@pkg/next-mdx/src/next-plugin/withMDXPageRefresh.meta'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { isDevelopmentEnv } from '#/config/env'
import DocumentHeadContent from '#/layouts/LegacyLayout/DocumentHeadContent'

class RootDocument extends Document {
  render() {
    return (
      <Html lang={'en'}>
        <Head>
          <DocumentHeadContent />
          {isDevelopmentEnv() && (
            // Forces a page refresh when a new MDX file is changed
            <meta name="x-mdx-refresh-timestamp" content={mdxRefresh.timestamp} />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default RootDocument
