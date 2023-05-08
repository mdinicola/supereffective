'use client'

import va from '@vercel/analytics'

import { useEffect, useRef } from 'react'

import { log as axiomLogger } from 'next-axiom'

export function SimpleAnalytics(): JSX.Element | null {
  const analyticsInjected = useRef(false)
  const clientInfoTracked = useRef(false)
  const clientData = useRef<any>({})

  const orientation = window?.screen?.orientation?.type || 'unknown'

  useEffect(() => {
    if (!analyticsInjected.current) {
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
        referrerUrl: document?.referrer || undefined,
      }

      va.inject()

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
