import config from '@/config'
import { PropsOf } from '@/lib/utils/types'

import { ExternLink } from '../Links'

export function TwitterLinkIcon({
  className,
  children,
  ...rest
}: {
  className?: string
  children?: any
} & PropsOf<'a'>) {
  return (
    <ExternLink href={config.links.twitter} title="Twitter/X" {...rest}>
      <i className="icon-brand-twitter" />
      {children}
    </ExternLink>
  )
}

export function DiscordLinkIcon({
  className,
  children,
  ...rest
}: {
  className?: string
  children?: any
} & PropsOf<'a'>) {
  return (
    <ExternLink href={config.links.discord} title="Discord" {...rest}>
      <i className="icon-brand-discord" />
      {children}
    </ExternLink>
  )
}

export function GithubLinkIcon({
  className,
  children,
  ...rest
}: {
  className?: string
  children?: any
} & PropsOf<'a'>) {
  return (
    <ExternLink href={config.links.github_org} title="Github" {...rest}>
      <i className="icon-brand-github" />
      {children}
    </ExternLink>
  )
}
