import Link from 'next/link'

import { NavLinkProps, NavLink as UiNavLink } from '@pkg/ui/components/navigation/NavBar'

export function NavLink(props: Omit<NavLinkProps, 'component'>): React.ReactElement {
  return <UiNavLink component={Link} {...props} />
}
