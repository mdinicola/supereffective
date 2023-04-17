import { afterEach, describe, expect, it, vi } from 'vitest'

import createMemoizedCallback from '@pkg/utils/src/caching/createMemoizedCallback'

import getFirebaseAnalytics from './getFirebaseAnalytics'
import getFirebaseApp from './getFirebaseApp'

vi.mock('@firebase/analytics', () => ({
  default: {
    getAnalytics: vi.fn(),
    setUserId: vi.fn(),
    logEvent: vi.fn(),
  },
}))

vi.mock('@pkg/utils/src/caching/createMemoizedCallback', () => ({
  default: vi.fn(callback => () => callback()),
}))

vi.mock('./getFirebaseApp', () => ({
  default: vi.fn(() => 'the_app'),
}))

describe('getFirebaseAnalytics', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('calls _createAnalyticsApi with the correct Firebase app', () => {
    const result = getFirebaseAnalytics()

    expect(createMemoizedCallback).toHaveBeenCalledTimes(1)
    expect(getFirebaseApp).toHaveBeenCalledTimes(1)

    expect(result).toStrictEqual({
      setUserId: expect.any(Function),
      logEvent: expect.any(Function),
    })
  })
})
