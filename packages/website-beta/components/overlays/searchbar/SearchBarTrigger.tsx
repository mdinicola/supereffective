import { DivAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { css } from '@/styled-system/css'
import { safearea } from '@/styled-system/patterns'

import Dialog from '../modal/Dialog'
import ModalTrigger from '../modal/ModalTrigger'
import SearchBar from './SearchBar'

type SearchBarTriggerProps = DivAttributes<{
  children: React.ReactElement
}>

export default function SearchBarTrigger({ children: trigger, ...rest }: SearchBarTriggerProps) {
  return (
    <ModalTrigger
      {...rest}
      transitionable
      transitionExitProperty="opacity"
      overlayClassName={css({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        p: 2,
        transition: 'background 500ms ease, opacity 500ms ease, max-width 500ms ease',
        backdropFilter: 'blur(10px) saturate(0.75)',
        bg: 'rgba(0, 0, 0, 0.5)',
        opacity: 1,
        '&[data-state="exiting"], &[data-state="exit-end"]': {
          bg: 'none',
          backdropFilter: 'none',
          opacity: 0,
        },
      })}
      innerClassName={cn(
        css({
          margin: '0 auto',
          transition: 'all 250ms ease',
          transform: 'translate(0, 0)',
          opacity: 1,
          width: '100%',
          height: '100%',
          '&[data-state="entering"]': {
            transform: 'translate(0, 0)',
          },
          '&[data-state="exiting"], &[data-state="exit-end"]': {
            transform: 'translate(0, -150px)',
            opacity: 0,
          },
        }),
        safearea({ p: 0 })
      )}
    >
      {trigger}
      <Dialog
        className={css({
          display: 'flex',
          flexDir: 'column',
          gap: 3,
          py: 3,
          px: 4,
          borderRadius: 'md',
          margin: '0 auto',
          width: '100%',
          maxWidth: '600px',
          bg: 'gray.900',
          color: 'gray.100',
          height: '100%',
          border: '1px solid token(colors.gray.800)',
        })}
      >
        <SearchBar />
      </Dialog>
    </ModalTrigger>
  )
}
