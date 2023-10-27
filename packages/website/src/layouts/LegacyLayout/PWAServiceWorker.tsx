import { useEffect } from 'react'

export function PWAServiceWorker({ disabled = false }: { disabled?: boolean }) {
  useEffect(() => {
    if (disabled) {
      return
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js', { scope: '*' })
        .then(registration => console.debug('PWA service-worker scope is: ', registration.scope))
    } else {
      console.warn('PWA service-worker not supported')
    }
  }, [disabled])

  return null
}
