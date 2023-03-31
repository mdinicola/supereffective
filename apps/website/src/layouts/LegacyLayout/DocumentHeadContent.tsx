import config from '@app/src/config'
import { GoogleAnalyticsScript } from '@app/src/layouts/LegacyLayout/GoogleAnalytics'

export default function DocumentHeadContent(): JSX.Element {
  const bgColor = config.theme.colors.$faviconBg

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

      {/* ----- Favicons generated with https://realfavicongenerator.net/ : */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/assets/favicon/apple-touch-icon.png?v=20230331"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/assets/favicon/favicon-32x32.png?v=20230331"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/assets/favicon/favicon-16x16.png?v=20230331"
      />
      <link rel="manifest" href="/assets/favicon/site.webmanifest?v=20230331" />
      <link
        rel="mask-icon"
        href="/assets/favicon/safari-pinned-tab.svg?v=20230331"
        color={bgColor}
      />
      <link rel="shortcut icon" href="/assets/favicon/favicon.ico?v=20230331" />
      <meta name="apple-mobile-web-app-title" content={config.texts.standaloneTitle} />
      <meta name="application-name" content={config.texts.standaloneTitle} />
      <meta name="msapplication-TileColor" content={bgColor} />
      <meta name="msapplication-config" content="/assets/favicon/browserconfig.xml?v=20230331" />
      <meta name="theme-color" content={bgColor} />
      {/* --------------------------------------------------------------END */}

      <GoogleAnalyticsScript />
    </>
  )
}
