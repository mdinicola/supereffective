import { HTMLAttributes } from 'react'

import { cn } from '../../lib/classNames'
import classes from './NavBar.module.css'

type NavBarProps = HTMLAttributes<HTMLDivElement> & {
  children: [React.ReactNode, React.ReactNode, React.ReactNode]
}
/**
 * NavBar is a sticky and responsive navigation bar.
 * It has 3 children:
 *
 * - The first child is the logo/brand element, which is always visible.
 * - The second child is the desktop navigation, which is hidden on mobile.
 * - The third child is the mobile navigation, which is hidden on desktop
 */
export function NavBar({ children, className, ...rest }: NavBarProps): JSX.Element {
  return (
    <div className={cn(classes.root, className)} {...rest}>
      <div className={classes.wr}>
        <div className={classes.navFlex}>
          <div className="flex">
            <div className={classes.flexLeft}>{children[0]}</div>
          </div>
          <div className="flex">
            <nav className="flex" tabIndex={0}>
              <div className={classes.navDesktop}>{children[1]}</div>
              <div className={classes.navMobile}>{children[2]}</div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export type NavLinkProps = {
  component?: React.ElementType
  href: string
  active?: boolean
} & HTMLAttributes<HTMLAnchorElement>

export function NavLink({
  component: Link = 'a',
  href,
  active,
  className,
  children,
  ...rest
}: NavLinkProps): JSX.Element {
  return (
    <Link
      href={href}
      className={cn(classes.navLink, [classes.active, active, className])}
      {...rest}
    >
      {children}
    </Link>
  )
}
