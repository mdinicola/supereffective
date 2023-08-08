'use client'

import React, { useEffect, useRef, useState } from 'react'
import { AriaModalOverlayProps, Overlay, useModalOverlay } from 'react-aria'
import { OverlayTriggerState } from 'react-stately'

import Animated, { AnimatedState } from '@/components/primitives/Animated'
import config from '@/lib/config'
import { usePathChangeEvent } from '@/lib/hooks/usePathChangeEvent'
import { DivAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { css } from '@/styled-system/css'
import { safearea } from '@/styled-system/patterns'

export type ModalBody = React.ReactElement<{ close: () => void; id?: string }>

export type ModalProps = DivAttributes<{
  children?: React.ReactNode
  state: OverlayTriggerState
  overlayClassName?: string
  innerClassName?: string
  transitionable?: boolean
  transitionState?: AnimatedState
  transitionExitProperty?: string
}> &
  AriaModalOverlayProps

export default function Modal({
  className: underlayClassName,
  overlayClassName,
  innerClassName,
  state,
  children,
  transitionable,
  transitionState,
  transitionExitProperty = 'opacity',
  ...rest
}: ModalProps) {
  const modalRef = useRef(null)
  const { modalProps, underlayProps } = useModalOverlay(rest, state, modalRef)
  const [localTransitionState, setLocalTransitionState] = useState<AnimatedState>('exit-end')
  const closeModal = () => {
    if (state.isOpen) {
      setLocalTransitionState('exiting')
    }
  }
  const childrenWithClose = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { close: closeModal } as any)
    }
    return child
  })

  usePathChangeEvent(closeModal)

  useEffect(() => {
    if (!transitionable || !transitionState) {
      return
    }
    if (localTransitionState !== transitionState) {
      setLocalTransitionState(transitionState)
    }
  }, [transitionable, transitionState])

  useEffect(() => {
    if (!transitionable) {
      return
    }
    if (state.isOpen) {
      setLocalTransitionState('entering')
    }
  }, [transitionable, state.isOpen])

  const transitionStateDebug = config.debugMode ? (
    <div
      className={css({
        marginLeft: '-10px',
        fontSize: '12px',
        zIndex: 1000,
        padding: '4px',
        color: 'black',
        background: 'gold',
        display: 'none',
        opacity: 0.5,
        '&.debug-mode': {
          display: 'inline-block',
        },
      })}
    >
      {localTransitionState}
    </div>
  ) : null

  if (!state.isOpen) {
    return transitionStateDebug
  }

  const handleClickOutside = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (rest.onClick) {
      rest.onClick(e as any)
    }

    if (e.target === e.currentTarget) {
      if (!transitionable) {
        state.close()
        return
      }

      setLocalTransitionState('exiting')
    }
  }

  const handleExitTransition = transitionable
    ? (_: Element, propName: string) => {
        if (state.isOpen && propName === transitionExitProperty) {
          state.close()
        }
      }
    : undefined

  const composedUnderlayClassName = cn(
    css({
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'block',
      zIndex: 100,
      '&[data-state="entering"], &[data-state="exiting"]': {
        pointerEvents: 'none', // needed to avoid unwanted clicks on Android Chrome
      },
      '&[data-state="exit-end"]': {
        pointerEvents: 'none', // needed to avoid unwanted clicks on Android Chrome
        zIndex: -1,
      },
    }),
    safearea(),
    underlayClassName
  )

  return (
    <Overlay>
      <div
        className={cn(composedUnderlayClassName, 'modal-underlay')}
        {...underlayProps}
        data-state={localTransitionState}
        // onClick={handleClickOutside}
      >
        {transitionStateDebug}
        <Animated
          ref={modalRef}
          state={localTransitionState}
          {...modalProps}
          className={cn(overlayClassName, 'modal-overlay')}
          onStateChange={(element, prevState, newState) => {
            setLocalTransitionState(newState)
          }}
          onClick={handleClickOutside}
        >
          <Animated
            state={localTransitionState}
            className={cn(innerClassName, 'modal')}
            onExitTransition={handleExitTransition}
            // onExitTransition={handleExitTransition}
            onClick={handleClickOutside}
          >
            {childrenWithClose}
          </Animated>
        </Animated>
      </div>
    </Overlay>
  )
}
