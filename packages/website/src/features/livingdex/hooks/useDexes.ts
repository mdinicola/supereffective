import { useState } from 'react'

import { useGuardedFetch } from '@pkg/auth/lib/hooks/useGuardedFetch'
import { LoadedDex, LoadedDexList } from '@pkg/database/repositories/living-dexes/legacy/types'
import { jsonEncode } from '@pkg/utils/lib/serialization/jsonSerializable'

import { Routes } from '#/config/routes'

async function _getApiErrorResponseMessage(response: Response): Promise<string> {
  const data = await response.json()
  if (data && data.message) {
    return data.message
  }
  return response.statusText
}

export type UseDexesResult =
  | {
      dexesLoading: boolean
      dexes: LoadedDexList
      error: undefined
      saveDex: (dex: LoadedDex) => Promise<LoadedDex>
      deleteDex: (dexId: string) => Promise<string[]>
      lastOperationTimestamp: Date
    }
  | {
      dexesLoading: boolean
      dexes: never[]
      error: Error
      saveDex: () => Promise<Error>
      deleteDex: () => Promise<Error>
      lastOperationTimestamp: Date
    }

export function useDexes(): UseDexesResult {
  const swr = useGuardedFetch<LoadedDexList>(Routes.API.LivingDexes)
  const [lastOperationTimestamp, setLastOperationTimestamp] = useState<Date>(new Date())

  if (swr.error) {
    // not authenticated or some other error
    return {
      dexesLoading: false,
      dexes: [],
      error: swr.error,
      saveDex: async () => {
        throw new Error('Not authenticated')
      },
      deleteDex: async () => {
        throw new Error('Not authenticated')
      },
      lastOperationTimestamp,
    }
  }

  const saveDex = async (dex: LoadedDex): Promise<LoadedDex> => {
    dex.updatedAt = new Date()
    if (!dex.createdAt) {
      dex.createdAt = new Date()
    }

    const response = await fetch(`${Routes.API.LivingDexes}`, {
      method: 'PATCH',
      body: jsonEncode(dex),
    })

    if (!response.ok) {
      throw new Error('Failed to save dex: ' + (await _getApiErrorResponseMessage(response)))
    }

    swr.clearCache()
    setLastOperationTimestamp(dex.updatedAt)

    return await response.json()
  }

  const deleteDex = async (dexId: string): Promise<string[]> => {
    const response = await fetch(`${Routes.API.LivingDexes}/${dexId}`, {
      method: 'DELETE',
      body: JSON.stringify({ id: dexId }),
    })

    if (!response.ok) {
      throw new Error('Failed to delete dex: ' + (await _getApiErrorResponseMessage(response)))
    }

    swr.clearCache()
    setLastOperationTimestamp(new Date())

    return await response.json()
  }

  return {
    dexesLoading: !swr.isReady,
    dexes: swr.data || [],
    error: swr.error,
    saveDex,
    deleteDex,
    lastOperationTimestamp,
  }
}
