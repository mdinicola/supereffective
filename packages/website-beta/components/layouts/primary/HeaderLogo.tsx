import LogoIcon from '@/assets/logo/logo.svg'
import Button from '@/components/primitives/Button'
import { css } from '@/styled-system/css'

export default function HeaderLogo({ withText }: { withText?: boolean }) {
  return (
    <Button
      href="/"
      title="Home"
      hardLink
      color="transparent"
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        color: 'inherit',
        textDecoration: 'none',
        WebkitTapHighlightColor: 'transparent',
      })}
    >
      <LogoIcon width={32} height={32} />
    </Button>
  )
}
