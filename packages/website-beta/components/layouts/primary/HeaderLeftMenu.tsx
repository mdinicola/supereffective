import { MenuIcon } from 'lucide-react'

import GeneralSidebar from '@/components/overlays/sidebars/GeneralSidebar'
import Button from '@/components/primitives/Button'
import { css } from '@/styled-system/css'

import HeaderLogo from './HeaderLogo'

export default function HeaderLeftMenu() {
  return (
    <div
      className={css({
        display: 'flex',
        flexShrink: 0,
        gap: 3,
        alignItems: 'center',
        fontSize: 'lg',
        letterSpacing: 'tighter',
        fontWeight: 'bold',
        textDecoration: 'none',
        WebkitTapHighlightColor: 'transparent',
      })}
    >
      <GeneralSidebar>
        <Button color="transparent" title="Menu">
          <MenuIcon size={32} />
        </Button>
      </GeneralSidebar>

      <HeaderLogo />
    </div>
  )
}
