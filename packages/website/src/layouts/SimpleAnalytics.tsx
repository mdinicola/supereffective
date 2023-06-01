'use client'

import { useEffect, useRef } from 'react'
import { log as axiomLogger } from 'next-axiom'
import va from '@vercel/analytics'

export function SimpleAnalytics(): JSX.Element | null {
  const analyticsInjected = useRef(false)
  const clientInfoTracked = useRef(false)
  const clientData = useRef<any>({})

  useEffect(() => {
    if (!analyticsInjected.current) {
      const orientation = window?.screen?.orientation?.type ?? 'unknown'
      const referrerWithoutQuery = document?.referrer?.split('?')[0] ?? undefined

      clientData.current = {
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

      va.inject()

      analyticsInjected.current = true
    }
  }, [])

  useEffect(() => {
    if (analyticsInjected.current && !clientInfoTracked.current) {
      axiomLogger.info('client_info', clientData.current)
      clientInfoTracked.current = true
    }
  }, [])

  return null
}
