'use client'

import { useEffect, useRef } from 'react'
import { log as axiomLogger } from 'next-axiom'

export function SimpleAnalytics(): JSX.Element | null {
  const clientInfoTracked = useRef(false)
  const eventName = 'device_info__axios'

  useEffect(() => {
    if (!clientInfoTracked.current) {
      const orientation = window?.screen?.orientation?.type ?? 'unknown'
      const referrerWithoutQuery = document?.referrer?.split('?')[0] ?? undefined

      const eventData = {
        screenResolution: `${window?.screen?.width}x${window?.screen?.height}`,
        viewportWidth: document?.documentElement?.clientWidth || 'unknown',
        viewportHeight: document?.documentElement?.clientHeight || 'unknown',
        pixelRatio: window?.devicePixelRatio || 'unknown',
        colorDepth: window?.screen?.colorDepth || 'unknown',
        orientation: orientation.includes('portrait')
          ? 'portrait'
          : orientation.includes('landscape')
          ? 'landscape'
          : orientation,
        timezone: Intl.DateTimeFormat()?.resolvedOptions()?.timeZone || 'unknown',
        language: window?.navigator?.language || 'unknown',
        referrerUrl: referrerWithoutQuery,
      }

      axiomLogger.info(eventName, eventData)

      clientInfoTracked.current = true
    }
  }, [])

  return null
}
