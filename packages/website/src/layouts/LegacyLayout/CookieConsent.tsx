import { useEffect } from 'react'

export default function CookieConsent() {
  useEffect(() => {
    // @ts-ignore
    const cc = window.initCookieConsent()
    cc.run({
      gui_options: {
        consent_modal: {
          layout: 'cloud', // box/cloud/bar
          position: 'bottom center', // bottom/middle/top + left/right/center
          transition: 'slide', // zoom/slide
          swap_buttons: false, // enable to invert buttons
        },
        settings_modal: {
          layout: 'box', // box/bar
          // position: 'left',           // left/right
          transition: 'slide', // zoom/slide
        },
      },
    })
  }, [])

  return null
}
