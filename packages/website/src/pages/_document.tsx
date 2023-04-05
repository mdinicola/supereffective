import Document, { Head, Html, Main, NextScript } from 'next/document'

import DocumentHeadContent from '#/layouts/LegacyLayout/DocumentHeadContent'

class RootDocument extends Document {
  render() {
    return (
      <Html lang={'en'}>
        <Head>
          <DocumentHeadContent />
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
