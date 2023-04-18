import { createContext, ReactNode, useContext, useEffect, useReducer } from 'react'

import { AuthProvider, useAuth as useAuthLib } from '@pkg/auth/src/AuthProvider'
import { OAuthProviderName } from '@pkg/auth/src/types'
import { LoadedDexList } from '@pkg/database/src/living-dexes/legacy/types'

import { withCountedPokemon } from '#/features/legacy/livingdex/state/LivingDexContext'
import { User } from '#/features/legacy/users/types'
import { debug } from '#/utils/legacyUtils'

// ===========================
//          TYPES
// ===========================

type UserContextState = {
  user: User | null
  dexes: LoadedDexList | null
  loading: boolean
  error?: string | null
}

type UserContextAction = {
  type: 'LOGIN' | 'LOGOUT' | 'LOADING' | 'SET_DEXES' | 'UPDATE_DEX' | 'SET_USER'
  payload?: User | string | any | null
}

export type UserContextType = {
  state: UserContextState
  signIn: (provider: OAuthProviderName) => Promise<User | null>
  logout: () => Promise<void>
  enterLoadingMode: () => void
  isLoading: () => boolean
  setDexes: (dexes: LoadedDexList | null) => void
}

// ===========================
//        Initial Values
// ===========================

const initialState: UserContextState = {
  user: null,
  dexes: null,
  loading: true,
  error: null,
}

const initialContext: UserContextType = {
  state: initialState,
  signIn: () => Promise.resolve(null),
  logout: () => Promise.resolve(),
  isLoading: () => initialState.loading,
  enterLoadingMode: () => null,
  setDexes: () => null,
}

// ===========================
//      Action Reducer
// ===========================
const userActionReducer = (
  state: UserContextState,
  action: UserContextAction
): UserContextState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        user: action.payload,
        dexes: state.dexes,
        loading: false,
      }
    case 'SET_DEXES':
      return {
        user: state.user,
        dexes: action.payload,
        loading: false,
      }
    case 'LOGOUT':
      return {
        user: null,
        dexes: null,
        loading: false,
      }
    case 'LOADING':
      return {
        user: null,
        dexes: state.dexes,
        error: null,
        loading: true,
      }
    default:
      debug('Unknown action type', action.type)
      return state
  }
}

// ===========================
//    Context and Provider
// ===========================
const UserContext = createContext<UserContextType>(initialContext)

const BaseUserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userActionReducer, initialState)
  const auth = useAuthLib()
  const currentUser: User | null = auth.currentUser

  // Define the actions
  const setUser = (user: User | null) => {
    dispatch({
      type: 'SET_USER',
      payload: user,
    })
  }

  const logout = async () => {
    auth.signOut().then(() => {
      dispatch({
        type: 'LOGOUT',
        payload: null,
      })
    })
  }

  const enterLoadingMode = () => {
    dispatch({
      type: 'LOADING',
      payload: null,
    })
  }

  const isLoading = () => state.loading

  const setDexes = (dexes: LoadedDexList | null) => {
    dispatch({
      type: 'SET_DEXES',
      payload: dexes ? dexes.map(dex => withCountedPokemon(dex)) : null,
    })
  }

  useEffect(() => {
    if (state.loading && currentUser === null) {
      setUser(null)
    } else if (currentUser !== state.user) {
      setUser(currentUser)
    }
  }, [currentUser, state.user, state.loading])

  return (
    <UserContext.Provider
      value={{
        state,
        signIn: auth.signIn,
        logout,
        enterLoadingMode,
        isLoading,
        setDexes,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

const UserProvider = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    <BaseUserProvider>{children}</BaseUserProvider>
  </AuthProvider>
)

const useUser = (): UserContextState => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context.state
}

const useAuth = (): UserContextType => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}

export { UserContext, UserProvider, useUser, useAuth }
