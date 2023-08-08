'use client'

import React from 'react'
import { AriaModalOverlayProps, useOverlayTrigger } from 'react-aria'
import { OverlayTriggerProps, useOverlayTriggerState } from 'react-stately'

import { DivAttributes } from '@/lib/types/react'

import Modal, { ModalBody, ModalProps } from './Modal'

type ModalTriggerProps = DivAttributes<{
  children: [React.ReactElement, ModalBody]
}> &
  Omit<ModalProps, 'state'> &
  OverlayTriggerProps &
  AriaModalOverlayProps

export default function ModalTrigger({ children, ...rest }: ModalTriggerProps) {
  const state = useOverlayTriggerState(rest)

  const { triggerProps, overlayProps } = useOverlayTrigger({ type: 'dialog' }, state)

  const triggerWithProps = React.cloneElement(children[0], {
    ...triggerProps,
    onClick: undefined,
    onPress: () => {
      state.open()
    },
  })
  const overlayWithProps = React.cloneElement(children[1], overlayProps)

  return (
    <>
      {triggerWithProps}
      {
        <Modal {...rest} state={state}>
          {overlayWithProps}
        </Modal>
      }
    </>
  )
}
