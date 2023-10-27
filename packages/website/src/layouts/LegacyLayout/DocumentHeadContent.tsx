import config from '#/config'

export default function DocumentHeadContent(): JSX.Element {
  const bgColor = config.themeColor

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* ----- Favicons generated with https://realfavicongenerator.net/ : */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/assets/favicon/apple-touch-icon.png?v=20231027"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/assets/favicon/favicon-32x32.png?v=20231027"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/assets/favicon/favicon-16x16.png?v=20231027"
      />
      <link rel="manifest" href="/manifest.webmanifest" />
      <link
        rel="mask-icon"
        href="/assets/favicon/safari-pinned-tab.svg?v=20231027"
        color={bgColor}
      />
      <link rel="shortcut icon" href="/assets/favicon/favicon.ico?v=20231027" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-touch-fullscreen" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />

      {/* ----- PWA settings: */}
      <meta name="apple-mobile-web-app-title" content={config.texts.standaloneTitle} />
      <meta name="application-name" content={config.texts.standaloneTitle} />
      <meta name="msapplication-TileColor" content={bgColor} />
      <meta name="msapplication-config" content="/assets/favicon/browserconfig.xml?v=20231027" />
      <meta name="theme-color" content={bgColor} />
      {/* --------------------------------------------------------------END */}
    </>
  )
}
