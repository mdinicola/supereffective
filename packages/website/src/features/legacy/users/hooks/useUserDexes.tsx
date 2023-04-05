import { useEffect, useState } from 'react'

import { UserContextType } from '#/features/legacy/users/state/UserContext'
import { DexList } from '#/services/legacy/datastore/Entities'
import { findDexesByUser } from '#/services/legacy/datastore/Firebase'
import { debug } from '#/utils/legacyUtils'

export const useUserDexes = (
  userCtx: UserContextType
): [DexList | null, boolean, (dexes: DexList | null) => void] => {
  const userState = userCtx.state
  const setUserDexes = userCtx.setDexes
  const [dexes, setDexes] = useState<DexList | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userState.loading) {
      debug('user is loading')
      if (!loading) {
        debug('Set loading to true')
        setLoading(true)
      }
      return
    }

    if (userState.user === null && !userState.loading) {
      debug('user not logged in')
      setDexes(null)
      setLoading(false)
      return
    }

    if (userState.dexes !== null && dexes === userState.dexes && !loading) {
      debug('dexes already fetched')
      return
    }

    const fetchData = async () => {
      if (userState.user === null) {
        debug('User still null?')
        return
      }

      let userDexes = userState.dexes
      if (userDexes === null) {
        debug('fetching dexes from Firestore')
        userDexes = await findDexesByUser(userState.user.uid)
        setUserDexes(userDexes)
      } else {
        debug('fetching dexes from context')
      }
      setDexes(userDexes)
      setLoading(false)
    }

    fetchData()

    return () => {
      debug('  unmounting useUserDexes')
    }
  }, [dexes, loading, userState, setUserDexes])

  const setDexesEverywhere = (dexes: DexList | null) => {
    setDexes(dexes)
    setUserDexes(dexes)
  }

  return [dexes, loading, setDexesEverywhere]
}
