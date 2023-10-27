import { useEffect } from 'react'

export function PWAServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => console.debug('PWA service-worker scope is: ', registration.scope))
    } else {
      console.warn('PWA service-worker not supported')
    }
  })

  return null
}
