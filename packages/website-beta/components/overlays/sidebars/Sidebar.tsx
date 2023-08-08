import { DivAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'

import Dialog from '../modal/Dialog'
import { ModalBody } from '../modal/Modal'
import ModalTrigger from '../modal/ModalTrigger'

type SidebarProps = Omit<DivAttributes, 'children'> & {
  placement?: 'left' | 'right'
  children: [React.ReactElement, ModalBody]
}

export const flexIconsClass = flex({
  // display: 'none',
  gap: 4,
  px: 2,
  justifyContent: 'space-evenly',
  _standalone: {
    display: 'flex',
  },
})

export const sidebarBodyClass = css({
  width: 'auto',
  height: '100%',
  display: 'flex',
  flexDir: 'column',
  justifyContent: 'space-between',
})

export default function Sidebar({
  children,
  className,
  placement = 'left',
  ...rest
}: SidebarProps) {
  const outerOverlayClassName = cn(
    css({
      position: 'relative',
      width: '100%',
      height: '100%',
      transition: 'background 500ms ease, opacity 500ms ease, max-width 500ms ease',
      bgColor: 'gray.900-60',
      opacity: 1,
      overflow: 'hidden',
      //backdropFilter: 'blur(3px)',
      '&[data-state="exiting"], &[data-state="exit-end"]': {
        bg: 'none',
        opacity: 0,
      },
    }),
    className
  )

  const innerOverlayClassName = cn(
    css({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: '100%',
      width: '100%',
      transition: 'all 250ms ease',
      opacity: 0,
    }),
    [
      placement === 'left',
      css({
        maxWidth: '75vw',
        transform: 'translate(-96vw, 0)',
        '&[data-state="entering"], &[data-state="enter-end"]': {
          transform: 'translate(0, 0)',
          opacity: 1,
        },
        '&[data-state="exiting"], &[data-state="exit-end"]': {
          transform: 'translate(-96vw, 0)',
          opacity: 0,
        },
      }),
    ],
    [
      placement === 'right',
      css({
        display: 'flex',
        justifyContent: 'flex-end',
        transform: 'translate(101vw, 0)',
        '&[data-state="entering"], &[data-state="enter-end"]': {
          transform: 'translate(0, 0)',
          opacity: 1,
        },
        '&[data-state="exiting"], &[data-state="exit-end"]': {
          transform: 'translate(101vw, 0)',
          opacity: 0,
        },
      }),
    ]
  )

  const dialogClassName = cn(
    css({
      display: 'flex',
      flexDir: 'column',
      justifyContent: 'space-between',
      gap: 3,
      py: 6,
      px: 4,
      width: '100%',
      height: '100%',
      maxWidth: '300px',
      bg: 'gray.900-95',
      color: 'gray.100',
      outline: 'none',
      boxShadow: '2px 0 5px 2px rgba(0, 0, 0, 0.4)',
    })
  )

  const trigger = children[0]
  const dialogBody = children[1]

  return (
    <ModalTrigger
      {...rest}
      transitionable
      transitionState={'exit-end'}
      overlayClassName={outerOverlayClassName}
      innerClassName={innerOverlayClassName}
    >
      {trigger}
      <Dialog className={dialogClassName}>{dialogBody}</Dialog>
    </ModalTrigger>
  )
}
