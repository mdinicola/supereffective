import React, { createContext, useContext } from 'react'

import { AuthApi } from './types'
import { useFirebaseAuth } from './useFirebaseAuth'

const authContext = createContext<AuthApi | null>(null)

// Provider component that wraps your app and makes the "auth" object available
// to any child component that calls useAuth().
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useFirebaseAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

// Hook for child components to get the auth object and re-render when it changes.
export const useAuth = (): AuthApi => {
  const auth = useContext(authContext)
  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return auth
}
