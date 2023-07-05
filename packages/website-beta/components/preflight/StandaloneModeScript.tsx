'use client'

import { useEffect } from 'react'

type ScriptProps = {
  selectorClassName?: string
  className?: string
}

export default function StandaloneModeScript({
  selectorClassName = 'standalone-aware',
}: ScriptProps) {
  const standaloneClassName = 'standalone-mode'
  const noStandaloneClassName = 'browser-mode'

  useEffect(() => {
    const isStandalone_WebKit = (window.navigator as any).standalone === true
    const isStandalone_Other = window.matchMedia('(display-mode: standalone)').matches

    const isStandalone = isStandalone_WebKit || isStandalone_Other

    const elements = document.getElementsByClassName(selectorClassName)
    Array.from(elements).forEach(element => {
      if (isStandalone) {
        element.classList.add(standaloneClassName)
      } else {
        element.classList.add(noStandaloneClassName)
      }
    })
  }, [])

  return null
}
