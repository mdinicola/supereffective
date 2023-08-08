'use client'

import { useVirtualizer } from '@tanstack/react-virtual'

type UseVirtualScrollOptions<T extends Element> = {
  parentRef: React.RefObject<T>
  total: number
  overflowItems?: number
  estimatedItemSize?: number
  keyMapper?: (index: number) => string
}

export default function useVirtualScroll<T extends Element, ItemElement extends Element = any>({
  total,
  overflowItems = 2,
  estimatedItemSize = 50,
  parentRef,
  keyMapper,
}: UseVirtualScrollOptions<T>) {
  const virtualizer = useVirtualizer<T, ItemElement>({
    count: total,
    getScrollElement: () => parentRef.current,
    getItemKey: keyMapper,
    estimateSize: () => estimatedItemSize,
    overscan: overflowItems,
    paddingEnd: 0,
    paddingStart: 0,
    scrollingDelay: 100,
  })

  return virtualizer
}
