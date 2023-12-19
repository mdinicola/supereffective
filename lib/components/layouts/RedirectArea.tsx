import { useRouter } from 'next/compat/router'

import { LoadingBanner } from './LegacyLayout/LoadingBanner'

export type RedirectAreaProps = {
  routeUri: string
  children?: React.ReactNode
}

export function RedirectArea({ routeUri, children }: RedirectAreaProps): JSX.Element {
  const router = useRouter()
  const content = children ? children : <LoadingBanner />

  router?.push(routeUri)
  return <>{content}</>
}
