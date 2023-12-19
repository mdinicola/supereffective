import { useAuthContext } from '../state/AuthProvider'
import { AuthUserState } from '../types'

export function useSession(): AuthUserState {
  const auth = useAuthContext()

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
