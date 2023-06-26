import { HTMLProps } from 'react'

import { PATREON_API_URLS } from '../constants'

type ConnectPatreonBtnProps = HTMLProps<HTMLAnchorElement> & {
  redirectUri: string
  clientId: string
  state?: string // e.g. a next-auth SessionId
}
export default function ConnectPatreonBtn({
  clientId,
  redirectUri,
  state,
  ...rest
}: ConnectPatreonBtnProps): JSX.Element {
  const urlParams = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'identity campaigns identity.memberships',

    state: state || '',
  })
  const url = `${PATREON_API_URLS.oauth2.authorize}?${urlParams.toString()}`

  return (
    <a {...rest} href={url} target="_blank" rel="noopener noreferrer">
      {rest.children || 'Link your Patreon account'}
    </a>
  )
}
