'use client'

import React, { useRef } from 'react'
import { AriaDialogProps, useDialog } from 'react-aria'

import { DivAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'

import { ModalBody } from './Modal'

type DialogProps = DivAttributes<{
  title?: React.ReactNode
  children: ModalBody
  close?: () => void
}> &
  AriaDialogProps

export default function Dialog({ close, title, children, className, ...props }: DialogProps) {
  const ref = useRef(null)
  const { dialogProps, titleProps } = useDialog(props, ref)
  const childrenWithClose = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { close })
    }
    return child
  })

  return (
    <div {...dialogProps} ref={ref} className={cn(className, 'dialog')}>
      {title && <div {...titleProps}>{title}</div>}
      {childrenWithClose}
    </div>
  )
}
