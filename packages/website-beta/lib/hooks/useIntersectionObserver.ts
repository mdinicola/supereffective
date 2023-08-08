import { useEffect, useRef, useState } from 'react'

export type IntersectionObserverChangeCallback<T extends Element = HTMLElement, D = any> = (
  data: D | undefined,
  ref: T | null,
  observer: IntersectionObserver,
  entry: IntersectionObserverEntry
) => void

export type IntersectionObserverEntryState = Pick<
  IntersectionObserverEntry,
  'isIntersecting' | 'intersectionRatio' | 'target'
>

export type IntersectionObserverHookProps<
  T extends Element = HTMLElement,
  D = any,
> = IntersectionObserverInit & {
  data?: D
  onIntersect?: IntersectionObserverChangeCallback<T, D>
  onIntersectionChange?: IntersectionObserverChangeCallback<T, D>
}

function useIntersectionObserver<T extends Element = HTMLElement, D = any>({
  data,
  rootMargin,
  root,
  threshold,
  onIntersect,
  onIntersectionChange,
}: IntersectionObserverHookProps<T, D>) {
  const ref = useRef<T>(null)
  const [state, setState] = useState<IntersectionObserverEntryState | undefined>()

  useEffect(() => {
    const _ref = ref

    const observerCallback = (
      instance: IntersectionObserver,
      [entry]: IntersectionObserverEntry[]
    ) => {
      {
        if (!state) {
          setState({
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
            target: entry.target,
          })
          return
        }

        if (entry.isIntersecting) {
          onIntersect?.(data, ref.current, instance, entry)
        }

        if (
          state.isIntersecting !== entry.isIntersecting ||
          state.intersectionRatio !== entry.intersectionRatio ||
          state.target !== entry.target
        ) {
          onIntersectionChange?.(data, ref.current, instance, entry)
          setState({
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
            target: entry.target,
          })
        }
      }
    }

    const observer = new IntersectionObserver(
      (entries, instance) => {
        observerCallback(instance, entries)
      },
      {
        rootMargin,
        root,
        threshold,
      }
    )

    if (_ref.current) {
      observer.observe(_ref.current)
    }

    return () => {
      if (_ref.current) {
        observer.unobserve(_ref.current)
      }

      observer.disconnect()
    }
  }, [rootMargin, root, threshold, data, state])

  return { state, ref }
}

export default useIntersectionObserver
