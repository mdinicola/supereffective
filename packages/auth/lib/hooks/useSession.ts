import { useAuthContext } from '../state/AuthProvider'
import { AuthUserState } from '../types'

export function useSession(): AuthUserState {
  const auth = useAuthContext()
  const userLoaded = auth.isAuthenticated() && auth.isOperable() && auth.currentUser !== null

  if (!userLoaded && auth.legacy.isAuthenticated()) {
    return {
      status: auth.legacy.status,
      currentUser: auth.legacy.currentUser,
      isAuthenticated: auth.legacy.isAuthenticated,
      isUnauthenticated: auth.legacy.isUnauthenticated,
      isLoading: auth.legacy.isLoading,
      isVerified: () => false,
      isOperable: () => false,
    }
  }

  return {
    status: auth.status,
    currentUser: auth.currentUser,
    isAuthenticated: auth.isAuthenticated,
    isUnauthenticated: auth.isUnauthenticated,
    isLoading: auth.isLoading,
    isVerified: auth.isVerified,
    isOperable: auth.isOperable,
  }
}
