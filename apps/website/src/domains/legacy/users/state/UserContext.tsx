import { createContext, ReactNode, useReducer } from 'react'

import { withCountedPokemon } from '@app/src/domains/legacy/livingdex/state/LivingDexContext'
import { DexList, User } from '@app/src/services/legacy/datastore/Entities'
import { clog } from '@app/src/utils/legacyUtils'

// ===========================
//          TYPES
// ===========================

interface UserContextState {
  user: User | null
  dexes: DexList | null
  loading: boolean
  error?: string | null
}

interface UserContextAction {
  type: 'LOGIN' | 'LOGOUT' | 'LOADING' | 'SET_DEXES' | 'UPDATE_DEX'
  payload?: User | string | any | null
}

export interface UserContextType {
  state: UserContextState
  login: (user: User) => void
  logout: () => void
  loading: () => void
  setDexes: (dexes: DexList | null) => void
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
  login: () => null,
  logout: () => null,
  loading: () => null,
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
    case 'LOGIN':
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
      clog('Unknown action type', action.type)
      return state
  }
}

// ===========================
//    Context and Provider
// ===========================
const UserContext = createContext<UserContextType>(initialContext)

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userActionReducer, initialState)

  // Define the actions
  const login = (user: User) => {
    dispatch({
      type: 'LOGIN',
      payload: user,
    })
  }

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: null,
    })
  }

  const loading = () => {
    dispatch({
      type: 'LOADING',
      payload: null,
    })
  }

  const setDexes = (dexes: DexList | null) => {
    dispatch({
      type: 'SET_DEXES',
      payload: dexes ? dexes.map(dex => withCountedPokemon(dex)) : null,
    })
  }

  return (
    <UserContext.Provider value={{ state, login, logout, loading, setDexes }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
