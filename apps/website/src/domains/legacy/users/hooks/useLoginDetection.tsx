import { useEffect } from 'react'

import { UserContextType } from '@app/src/domains/legacy/users/state/UserContext'
import { onAuthStateChanged } from '@app/src/services/legacy/datastore/Firebase'
import tracker from '@app/src/services/legacy/metrics/tracker'
import { clog } from '@app/src/utils/legacyUtils'

export const useLoginDetection = (userCtx: UserContextType): void => {
  useEffect(() => {
    onAuthStateChanged((user, err) => {
      if (user) {
        tracker.asUser(user.uid)
        userCtx.login(user)
        clog('[user loaded]')
      }
      if (err) {
        clog('Error on auth state changed', err)
      }
      if (user === null && err === null) {
        userCtx.logout()
      }
    })
  }, [])
}
