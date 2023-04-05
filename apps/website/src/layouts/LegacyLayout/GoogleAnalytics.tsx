import config from '@app/src/config'
import { debug } from '@app/src/utils/legacyUtils'

const GTAG_ID = config.services.analytics.googleAnalyticsId

export const isGaEnabled = () => {
  // @ts-ignore
  return !!GTAG_ID && window.gtag !== undefined
}

export const GoogleAnalyticsScript = function () {
  if (!GTAG_ID) {
    debug('Google Analytics ID not found')
    return null
  }

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GTAG_ID}');`,
        }}
      />
    </>
  )
}

// log the pageview with their URL
export const googleAnalyticsTrackPageView = (url: string) => {
  if (!isGaEnabled()) {
    return
  }
  // @ts-ignore
  window.gtag('config', GTAG_ID, {
    page_path: url,
  })
}

// log specific events happening.
export const googleAnalyticsTrackEvent = ({ name, params }: { name: string; params: object }) => {
  if (!isGaEnabled()) {
    return
  }
  // @ts-ignore
  window.gtag('event', name, params)
}
