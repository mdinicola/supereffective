import { useAuthContext } from '../state/AuthProvider'

export function useSignOut(): (redirect?: boolean, callbackUrl?: string) => Promise<void> {
  const auth = useAuthContext()

  return async (redirect?: boolean, callbackUrl?: string) => {
    await auth.signOut(redirect, callbackUrl)
    await auth.legacy.signOut()
  }
}

export function useLegacySignOut(): () => Promise<void> {
  const auth = useAuthContext()

  return async () => {
    await auth.legacy.signOut()
  }
}
