import Document, { Head, Html, Main, NextScript } from 'next/document'

import config from '@app/src/config/legacy'
import { GoogleAnalyticsScript } from '@app/src/layouts/LegacyLayout/GoogleAnalytics'

class MyDocument extends Document {
  render() {
    const ver = '?v=' + new Date().getTime()
    return (
      <Html lang={'en'}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

          {/* Favicons generated with realfavicongenerator.net : */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/assets/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/assets/favicon/favicon-32x32.png"
          />
          {/*<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png" />*/}
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="mask-icon"
            href="/assets/favicon/safari-pinned-tab.svg"
            color={config.webAppColors.safariPinnedTab}
          />
          <link rel="shortcut icon" href="/assets/favicon/favicon.ico" />
          <meta name="apple-mobile-web-app-title" content={config.siteName} />
          <meta name="application-name" content={config.siteName} />
          <meta name="msapplication-TileColor" content={config.webAppColors.windowsTile} />
          <meta name="msapplication-config" content="/assets/favicon/browserconfig.xml" />
          <meta name="theme-color" content={config.webAppColors.androidTheme} />

          {/*Preloads*/}
          {/*Fonts*/}
          {/*Scripts*/}
          <GoogleAnalyticsScript />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
