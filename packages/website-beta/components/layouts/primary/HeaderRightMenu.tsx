import SearchBarTrigger from '@/components/overlays/searchbar/SearchBarTrigger'
import UserSidebar from '@/components/overlays/sidebars/UserSidebar'
import Button from '@/components/primitives/Button'
import { css } from '@/styled-system/css'
import { SearchIcon, UserCircle2Icon } from 'lucide-react'

export default function HeaderRightMenu() {
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
      <SearchBarTrigger>
        <Button color="transparent" title="Search">
          <SearchIcon size={32} />
        </Button>
      </SearchBarTrigger>
      <UserSidebar>
        <Button color="transparent" title="User">
          <UserCircle2Icon size={32} />
        </Button>
      </UserSidebar>
    </div>
  )
}
