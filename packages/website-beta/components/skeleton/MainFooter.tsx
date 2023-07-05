import { DivAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { css } from '@/styled-system/css'

type MainFooterProps = DivAttributes<{
  children: React.ReactNode
}>

export default function MainFooter({ children, className, ...rest }: MainFooterProps) {
  return (
    <footer
      {...rest}
      className={cn(
        css({
          display: 'flex',
          pt: 4,
          px: 4,
          pb: 4,
          borderTopRadius: '3xl',
          userSelect: 'none',

          bgColor: 'gray.950',
          bgImage: 'url("/images/bg/sv_pattern_white.png")',
          bgSize: '50rem',

          color: 'gray.100',
          fontSize: 'md',
          letterSpacing: 'tighter',
          _motionSafe: {
            transition: 'padding 0.2s ease-in-out',
          },
          '&.standalone-mode': {
            pb: 10,
          },
        }),
        'standalone-aware',
        'main-footer',
        className
      )}
    >
      {children}
    </footer>
  )
}
