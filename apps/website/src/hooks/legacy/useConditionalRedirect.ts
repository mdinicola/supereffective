import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { clog } from '@app/src/utils/legacyUtils'

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
      clog('useConditionalRedirect: REDIRECTING - NO TIMEOUT')
      if (_route === 'back') {
        router.back()
      } else {
        router.push(_route)
      }
      return
    }
    redirectTimeouts.push(
      setTimeout(() => {
        clog('useConditionalRedirect: REDIRECTING - WITH TIMEOUT')
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
      clog('useConditionalRedirect: ABORTED')
      clearTimeout(redirectTimeouts.pop())
    }
  }

  useEffect(() => {
    if (conditions.waitIf) {
      clog('useConditionalRedirect: WAITING')
      return
    }
    if (conditions.redirectIf) {
      clog('useConditionalRedirect: STARTING')
      startRedirect(route, timeout)
      return
    }
    if (conditions.abortRedirectIf) {
      clog('useConditionalRedirect: ABORTING')
      abortRedirect()
      return
    }
  }, [conditions, route, timeout])
}
