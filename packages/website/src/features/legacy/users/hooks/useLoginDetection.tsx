import { useEffect } from 'react'
import { UserContextType } from '#/features/legacy/users/state/UserContext'
import { onAuthStateChanged } from '#/services/legacy/datastore/Firebase'
import tracker from '#/services/legacy/metrics/tracker'
import { debug } from '#/utils/legacyUtils'

export const useLoginDetection = (userCtx: UserContextType): void => {
  useEffect(() => {
    onAuthStateChanged((user, err) => {
      if (user) {
        tracker.asUser(user.uid)
        userCtx.login(user)
        debug('[user loaded]')
      }
      if (err) {
        debug('Error on auth state changed', err)
      }
      if (user === null && err === null) {
        userCtx.logout()
      }
    })
  }, [])
}
