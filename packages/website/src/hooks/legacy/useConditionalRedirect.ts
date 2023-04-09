import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { debug } from '#/utils/legacyUtils'

export interface RedirectConditions {
  waitIf: boolean
  redirectIf: boolean
  abortRedirectIf: boolean
}

let redirectTimeouts: any[] = []

export const useConditionalRedirect = (
  route: string | 'back',
  conditions: RedirectConditions,
  timeout: number = 0
) => {
  const router = useRouter()

  const startRedirect = (_route: string, _timeout: number) => {
    if (_timeout <= 0) {
      debug('useConditionalRedirect: REDIRECTING - NO TIMEOUT')
      if (_route === 'back') {
        router.back()
      } else {
        router.push(_route)
      }
      return
    }
    redirectTimeouts.push(
      setTimeout(() => {
        debug('useConditionalRedirect: REDIRECTING - WITH TIMEOUT')
        if (_route === 'back') {
          router.back()
        } else {
          router.push(_route)
        }
      }, _timeout)
    )
  }

  const abortRedirect = () => {
    if (redirectTimeouts.length > 0) {
      debug('useConditionalRedirect: ABORTED')
      clearTimeout(redirectTimeouts.pop())
    }
  }

  useEffect(() => {
    if (conditions.waitIf) {
      debug('useConditionalRedirect: WAITING')
      return
    }
    if (conditions.redirectIf) {
      debug('useConditionalRedirect: STARTING')
      startRedirect(route, timeout)
      return
    }
    if (conditions.abortRedirectIf) {
      debug('useConditionalRedirect: ABORTING')
      abortRedirect()
      return
    }
  }, [conditions, route, timeout])
}
