type MemoizedCallback<T extends () => any> = T & {
  clear(): void
}

export default function createMemoizeCallback<T extends () => any>(
  callback: T
): MemoizedCallback<T> {
  const cache = new Map<string, ReturnType<T>>()
  const cacheKey = '__memoized__'

  const memoized = (() => {
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)
    }
    const result = callback()
    cache.set(cacheKey, result)
    return result
  }) as MemoizedCallback<T>

  memoized.clear = () => {
    cache.clear()
  }

  return memoized
}
