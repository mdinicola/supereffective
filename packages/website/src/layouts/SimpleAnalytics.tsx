'use client'

import va from '@vercel/analytics'

import { useEffect, useRef } from 'react'

import { log as axiomLogger } from 'next-axiom'

export function SimpleAnalytics(): JSX.Element | null {
  const analyticsInjected = useRef(false)
  const clientInfoTracked = useRef(false)
  const clientData = useRef<any>({})

  useEffect(() => {
    if (!analyticsInjected.current) {
      clientData.current = {
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        viewportWidth: document.documentElement.clientWidth,
        viewportHeight: document.documentElement.clientHeight,
        pixelRatio: window.devicePixelRatio,
        colorDepth: window.screen.colorDepth,
        orientation: window.screen.orientation.type,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: window.navigator.language,
        referrerUrl: document.referrer || undefined,
      }

      va.inject({
        // beforeSend: event => {
        //   if (event.type !== 'pageview') {
        //     return event
        //   }
        //   return { ...clientData.current, ...event }
        // },
      })

      analyticsInjected.current = true
    }
  }, [])

  useEffect(() => {
    if (analyticsInjected.current && !clientInfoTracked.current) {
      va.track('client_info', clientData.current)
      axiomLogger.info('client_info', clientData.current)
      clientInfoTracked.current = true
    }
  }, [])

  return null
}
