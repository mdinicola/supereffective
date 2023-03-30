import { useEffect, useState } from 'react'

import { UserContextType } from '@app/src/domains/legacy/users/state/UserContext'
import { DexList } from '@app/src/services/legacy/datastore/Entities'
import { findDexesByUser } from '@app/src/services/legacy/datastore/Firebase'
import { clog } from '@app/src/utils/legacyUtils'

export const useUserDexes = (
  userCtx: UserContextType
): [DexList | null, boolean, (dexes: DexList | null) => void] => {
  const userState = userCtx.state
  const setUserDexes = userCtx.setDexes
  const [dexes, setDexes] = useState<DexList | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userState.loading) {
      clog('user is loading')
      if (!loading) {
        clog('Set loading to true')
        setLoading(true)
      }
      return
    }

    if (userState.user === null && !userState.loading) {
      clog('user not logged in')
      setDexes(null)
      setLoading(false)
      return
    }

    if (userState.dexes !== null && dexes === userState.dexes && !loading) {
      clog('dexes already fetched')
      return
    }

    const fetchData = async () => {
      if (userState.user === null) {
        clog('User still null?')
        return
      }

      let userDexes = userState.dexes
      if (userDexes === null) {
        clog('fetching dexes from Firestore')
        userDexes = await findDexesByUser(userState.user.uid)
        setUserDexes(userDexes)
      } else {
        clog('fetching dexes from context')
      }
      setDexes(userDexes)
      setLoading(false)
    }

    fetchData()

    return () => {
      clog('  unmounting useUserDexes')
    }
  }, [dexes, loading, userState, setUserDexes])

  const setDexesEverywhere = (dexes: DexList | null) => {
    setDexes(dexes)
    setUserDexes(dexes)
  }

  return [dexes, loading, setDexesEverywhere]
}
