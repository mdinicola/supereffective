import { useEffect, useState } from 'react'

import getFirebaseAuth, { User, UserCredential } from '@pkg/firebase/lib/getFirebaseAuth'
import { devLogger } from '@pkg/utils/lib/loggers'

import { AuthStatus, AuthUser, FirebaseAuthApi, OAuthProviderName } from '../../types'

const firebaseAuth = getFirebaseAuth()

const oauthProviders: Record<OAuthProviderName, () => Promise<UserCredential>> = {
  twitter: firebaseAuth.signIn.withTwitter,
  google: firebaseAuth.signIn.withGoogle,
  github: firebaseAuth.signIn.withGithub,
}

const _getOAuthProvider = (user: User): OAuthProviderName | null => {
  if (user.providerData.length > 0) {
    return user.providerData[0].providerId as OAuthProviderName
  }
  return null
}

const _getEmail = (user: User): string | null => {
  if (user.email) {
    return user.email
  }
  if (user.providerData.length > 0) {
    for (const provider of user.providerData) {
      if (provider.email) {
        return provider.email
      }
    }
  }
  return null
}

async function _transformUserObject(user: User): Promise<AuthUser> {
  return {
    providerId: _getOAuthProvider(user),
    uid: user.uid,
    displayName: user.displayName || null,
    email: _getEmail(user),
    photoUrl: user.photoURL || null,
    // sessionToken: (await getFirebaseAuth().getIdToken()) || null, // TODO get it on demand?
    userName: null,
    emailVerified: false, //  user.email && user.emailVerified ? new Date() : null,
    isDisabled: false,
  }
}

// Provider hook that creates auth object and handles state
export function useFirebaseAuth(onError?: (err: Error) => void): FirebaseAuthApi {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.Loading)

  // Wrap any Firebase methods we want to use making sure to save the user to state:

  const signIn = async (provider: OAuthProviderName): Promise<AuthUser> => {
    return oauthProviders[provider]().then(credential => {
      return _transformUserObject(credential.user).then(user => {
        localStorage.setItem('firebase_user', JSON.stringify(user))
        setUser(user)
        return user
      })
    })
  }

  const isAuthenticated = () => {
    return !!user && authStatus === AuthStatus.Authenticated
  }

  const isUnauthenticated = () => {
    return !user && authStatus === AuthStatus.Unauthenticated
  }

  const signOut = async () => {
    return firebaseAuth.signOut().then(() => {
      localStorage.removeItem('firebase_user')
      setUser(null)
    })
  }

  const getSessionToken = async (): Promise<string | null> => {
    return (await getFirebaseAuth().getIdToken()) || null
  }

  // Subscribe to user on mount.
  // Because this sets state in the callback, it will cause any component that utilizes
  // this hook to re-render with the latest "auth" object.
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      user => {
        if (user) {
          _transformUserObject(user).then(transformedUser => {
            devLogger.log('Firebase - Sign In', transformedUser)
            setUser(transformedUser)
            setAuthStatus(AuthStatus.Authenticated)
          })
        } else {
          devLogger.log('Firebase - Not Authenticated')
          // User is signed out or did not log in yet
          setUser(null)
          setAuthStatus(AuthStatus.Unauthenticated)
        }
      },
      err => {
        setAuthStatus(AuthStatus.Unauthenticated)
        console.error('Firebase - Sign In Error', err)
        if (onError) {
          onError(err)
          return
        }
      }
    )

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  // Return the user object and auth methods
  return {
    status: authStatus,
    currentUser: user,
    signIn,
    isAuthenticated,
    isUnauthenticated,
    signOut,
    isLoading: () => authStatus === 'loading',
    isVerified: () => false,
    isOperable: () => false,
    getSessionToken,
  }
}
