'use client'

import React, { useRef } from 'react'

export type AnimatedState = 'entering' | 'enter-end' | 'exiting' | 'exit-end'

type AnimatedProps = {
  state?: AnimatedState
  component?: React.ElementType
  children?: React.ReactNode
  onStateChange?: (element: HTMLElement, prevState: AnimatedState, newState: AnimatedState) => void
  onEnterTransition?: (element: HTMLElement, transitionProperty: string) => void
  onExitTransition?: (element: HTMLElement, transitionProperty: string) => void
} & React.HTMLAttributes<HTMLElement>

const Animated = React.forwardRef(function Animated(
  {
    state = 'entering',
    component = 'div',
    children,
    onStateChange,
    onEnterTransition,
    onExitTransition,
    ...rest
  }: AnimatedProps,
  ref: React.ForwardedRef<HTMLElement> | null
) {
  const Component = component || 'div'
  const localRef = useRef<HTMLElement | null>(null)

  // useEffect(() => {
  //   const element = ref.current
  //   if (!element) {
  //     return
  //   }

  //   element.className = cn(...enterClasses)
  //   return () => {
  //     element.className = cn(...exitClasses)
  //   }
  // }, [enterClasses, exitClasses])

  return (
    <Component
      ref={(node: HTMLElement) => {
        if (ref) {
          if (typeof ref === 'function') {
            ref(node)
          } else {
            ref.current = node
          }
        }
        localRef.current = node
      }}
      data-state={state}
      {...rest}
      onTransitionEnd={(e: React.TransitionEvent) => {
        e.stopPropagation()
        if (!localRef.current) {
          return
        }
        const element = localRef.current

        if (state === 'exit-end') {
          window.alert('state:exit-end')
          const newState: AnimatedState = 'entering'
          element.dataset.state = newState
          onStateChange?.(element, state, newState)
          return
        }

        if (state === 'entering') {
          const newState: AnimatedState = 'enter-end'
          element.dataset.state = newState
          setTimeout(() => onEnterTransition?.(element, e.propertyName), 5)
          onStateChange?.(element, state, newState)
        } else if (state === 'exiting') {
          const newState: AnimatedState = 'exit-end'
          element.dataset.state = newState
          setTimeout(() => onExitTransition?.(element, e.propertyName), 5)
          onStateChange?.(element, state, newState)
        }
      }}
    >
      {children}
    </Component>
  )
})

export default Animated
