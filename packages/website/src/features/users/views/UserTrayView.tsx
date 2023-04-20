import { useAuth } from '#/features/legacy/users/state/UserContext'
import { SiteLink } from '#/primitives/legacy/Link/Links'

type UserTrayViewProps = {
  activeClass?: string
  returnUrl?: string
} & React.HTMLAttributes<HTMLAnchorElement>

export function UserTrayView({ activeClass, returnUrl, ...rest }: UserTrayViewProps): JSX.Element {
  const auth = useAuth()

  if (auth.state.loading) {
    return (
      <a href="#" style={{ background: 'none !important' }}>
        Loading...
      </a>
    )
  }

  if (!auth.state.user) {
    return (
      <SiteLink
        {...rest}
        activeClass={activeClass}
        href={'/login' + (returnUrl ? '?s=' + returnUrl : '')}
        tabIndex={0}
      >
        Sign In
      </SiteLink>
    )
  }

  return (
    <SiteLink {...rest} href="/profile" activeClass={activeClass} tabIndex={0}>
      <i className="icon-user" style={{ marginRight: '0.5rem' }} /> Profile
    </SiteLink>
  )
}
