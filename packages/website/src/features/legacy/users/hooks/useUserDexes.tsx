import { useEffect, useState } from 'react'

import { getLivingDexRepository } from '@pkg/database/repositories/living-dexes/legacy'
import { LoadedDexList } from '@pkg/database/repositories/living-dexes/legacy/types'

import { UserContextType } from '#/features/legacy/users/state/UserContext'
import { debug } from '#/utils/legacyUtils'

export const useUserDexes = (
  userCtx: UserContextType
): [LoadedDexList | null, boolean, (dexes: LoadedDexList | null) => void] => {
  const userState = userCtx.state
  const setUserDexes = userCtx.setDexes
  const [dexes, setDexes] = useState<LoadedDexList | null>(null)
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
        debug('fetching dexes from DB')
        userDexes = await getLivingDexRepository().getManyByUser(userState.user.uid, 100)
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

  const setDexesEverywhere = (dexes: LoadedDexList | null) => {
    setDexes(dexes)
    setUserDexes(dexes)
  }

  return [dexes, loading, setDexesEverywhere]
}
