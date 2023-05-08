import { HTMLProps } from 'react'

type ConnectPatreonBtnProps = HTMLProps<HTMLAnchorElement> & {
  redirectUri: string
  clientId: string
}
export function ConnectPatreonBtn({
  clientId,
  redirectUri,
  ...rest
}: ConnectPatreonBtnProps): JSX.Element {
  // https://docs.patreon.com/?javascript#step-2-making-the-log-in-button
  const urlParams = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    // scope: 'users pledges-to-me my-campaign',
    // state: 'e.g. a nextAuthSessionId',
  })
  const url = `https://www.patreon.com/oauth2/authorize?${urlParams.toString()}`

  return (
    <a {...rest} href={url} target="_blank" rel="noopener noreferrer">
      {rest.children || 'Link your Patreon account'}
    </a>
  )
}
