import { useEffect, useState } from 'react'

import getFirebaseAuth, { User, UserCredential } from '@pkg/firebase/lib/getFirebaseAuth'

import { AuthApi, AuthProviderName, AuthUser, OAuthProviderName } from './types'

const firebaseAuth = getFirebaseAuth()

const oauthProviders: Record<OAuthProviderName, () => Promise<UserCredential>> = {
  twitter: firebaseAuth.signIn.withTwitter,
  google: firebaseAuth.signIn.withGoogle,
  github: firebaseAuth.signIn.withGithub,
}

// Provider hook that creates auth object and handles state
export function useFirebaseAuth(onError?: (err: Error) => void): AuthApi<AuthUser<User>> {
  const [user, setUser] = useState<User | null>(null)

  // Wrap any Firebase methods we want to use making sure to save the user to state:

  const signIn = (provider: OAuthProviderName) => {
    return oauthProviders[provider]().then(credential => {
      setUser(credential.user)
      return credential.user
    })
  }

  const isSignedIn = () => {
    return !!user
  }

  const createUser = (email: string, password: string) => {
    return firebaseAuth.createUser.withEmailAndPassword(email, password).then(response => {
      setUser(response.user)
      return response.user
    })
  }

  const signOut = () => {
    return firebaseAuth.signOut().then(() => {
      setUser(null)
    })
  }

  // Subscribe to user on mount.
  // Because this sets state in the callback, it will cause any component that utilizes
  // this hook to re-render with the latest "auth" object.
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      user => {
        if (user) {
          const modifiedUser = { ...user }
          if (user.providerData.length > 0) {
            modifiedUser.providerId = user.providerData[0].providerId
          }
          // firebaseAnalytics.setUserId(user.uid)
          setUser(modifiedUser)
        } else {
          // User is signed out.
          setUser(null)
        }
      },
      err => {
        if (onError) {
          onError(err)
          return
        }
        console.error(onError)
      }
    )

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  // Return the user object and auth methods
  return {
    authProvider: AuthProviderName.Firebase,
    currentUser: user,
    signIn,
    isSignedIn,
    signOut,
    createUser,
  }
}