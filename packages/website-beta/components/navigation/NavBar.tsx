import { NavBar as UiNavBar } from '@pkg/ui/components/navigation/NavBar'

import { NavLink } from '@/components/navigation/NavLink'
import { NavLogo } from '@/components/navigation/NavLogo'

export function NavBar(): React.ReactElement {
  return (
    <UiNavBar>
      <>
        <NavLogo />
      </>
      <>
        <NavLink active href="/">
          Pokédex
        </NavLink>
        <NavLink href="/">Dex Tracker</NavLink>
        <NavLink href="/">Sign In</NavLink>
      </>
      <>
        <NavLink href="/">Sign In</NavLink>
      </>
    </UiNavBar>
  )
}
