import { describe, expect, it, vi } from 'vitest'

import createMemoizeCallback from './createMemoizeCallback'

describe('createMemoizeCallback', () => {
  it('should memoize the result of the callback function', () => {
    const callback = vi.fn(() => ({ a: 1, b: 2 }))
    const memoized = createMemoizeCallback(callback)

    // Call memoized function the first time
    const memoizedResult = memoized()

    expect(memoizedResult).toStrictEqual({ a: 1, b: 2 })
    expect(callback).toHaveBeenCalledTimes(1)

    // Call memoized function again, should return the same object reference
    expect(memoized()).toBe(memoizedResult)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should clear the cache when clear method is called', () => {
    const callback = vi.fn(() => ({ a: 1, b: 2 }))
    const memoized = createMemoizeCallback(callback)

    // Call memoized function the first time
    const memoizedResult = memoized()

    expect(memoizedResult).toStrictEqual({ a: 1, b: 2 })
    expect(callback).toHaveBeenCalledTimes(1)

    // Call memoized function again after clearing cache
    memoized.clear()

    const secondMemoizedResult = memoized()
    expect(callback).toHaveBeenCalledTimes(2)
    expect(secondMemoizedResult).not.toBe(memoizedResult)
    expect(secondMemoizedResult).toStrictEqual(memoizedResult)
  })
})
