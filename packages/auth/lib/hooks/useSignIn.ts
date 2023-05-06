import { useAuthContext } from '../state/AuthProvider'
import { AuthApi } from '../types'

export function useSignIn(): {
  signInWithEmail: AuthApi['signIn']
  signInWithProvider: AuthApi['legacy']['signIn']
} {
  const auth = useAuthContext()

  return {
    signInWithEmail: auth.signIn,
    signInWithProvider: auth.legacy.signIn,
  }
}
