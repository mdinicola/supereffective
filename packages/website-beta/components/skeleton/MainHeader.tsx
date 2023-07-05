import HeaderLeftMenu from '@/components/skeleton/HeaderLeftMenu'
import HeaderRightMenu from '@/components/skeleton/HeaderRightMenu'
import { DivAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { css } from '@/styled-system/css'

type MainHeaderProps = DivAttributes<{
  menuTitle?: React.ReactNode
  children?: never
}>

export default function MainHeader({ className, menuTitle, ...rest }: MainHeaderProps) {
  return (
    <header
      {...rest}
      className={cn(
        css({
          display: 'flex',
          pt: 3,
          px: 4,
          pb: 3,
          gap: 3,
          color: 'gray.950',
          userSelect: 'none',
          justifyContent: 'space-between',
          borderRadius: '3xl',
          bgColor: 'gray.300',
          // bgImage: 'url("/images/bg/sv_pattern_black.png")',
          bgSize: '40rem',
          fontSize: 'lg',
          letterSpacing: 'tighter',
          _motionSafe: {
            transition: 'padding 0.2s ease-in-out',
          },
        }),
        'main-header',
        className
      )}
    >
      <HeaderLeftMenu />
      <h1
        className={
          css({
            display: 'inline-block',
            fontSize: 'lg',
            letterSpacing: 'tighter',
            fontWeight: '800',
            textDecoration: 'none',
            // truncate:
            maxWidth: 'fit-content',
            minWidth: '1ch',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            // truncate-end.
            py: 2,
          }) + ' standalone-aware'
        }
      >
        {menuTitle ? (
          menuTitle
        ) : (
          <>
            SuperEffective<small>.gg</small>
          </>
        )}
      </h1>
      <HeaderRightMenu />
    </header>
  )
}
