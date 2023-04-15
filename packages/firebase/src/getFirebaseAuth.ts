import * as _firebase from '@firebase/app'
import * as _firebaseAuth from '@firebase/auth'
import { GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider } from '@firebase/auth'

import createMemoizedCallback from '@pkg/utils/src/universal/createMemoizedCallback'

import getFirebaseApp from './getFirebaseApp'

const getFirebaseAuth = createMemoizedCallback(() => _createAuthApi(getFirebaseApp()))

export default getFirebaseAuth

export type User = _firebaseAuth.User
export type UserCredential = _firebaseAuth.UserCredential

function _createAuthApi(app: _firebase.FirebaseApp) {
  // Initialize Firebase Authentication and get a reference to the service
  const auth = _firebaseAuth.getAuth(app)
  auth.useDeviceLanguage()

  return {
    createUser: {
      withEmailAndPassword: (email: string, password: string) => {
        return _firebaseAuth.createUserWithEmailAndPassword(auth, email, password)
      },
    },
    signIn: {
      withEmailAndPassword: (email: string, password: string): Promise<UserCredential> => {
        return _firebaseAuth.signInWithEmailAndPassword(auth, email, password)
      },
      withTwitter: async (): Promise<UserCredential> => {
        return _firebaseAuth.signInWithPopup(auth, new TwitterAuthProvider())
      },
      withGoogle: async (): Promise<UserCredential> => {
        return _firebaseAuth.signInWithPopup(auth, new GoogleAuthProvider())
      },
      withGithub: async (): Promise<UserCredential> => {
        return _firebaseAuth.signInWithPopup(auth, new GithubAuthProvider())
      },
    },
    signOut: () => {
      return _firebaseAuth.signOut(auth)
    },
    sendPasswordResetEmail: (email: string) => {
      return _firebaseAuth.sendPasswordResetEmail(auth, email)
    },
    onAuthStateChanged: (
      onSuccess: (user: User | null) => void,
      onError?: _firebaseAuth.ErrorFn
    ) => {
      return _firebaseAuth.onAuthStateChanged(auth, onSuccess, onError)
    },
    getIdToken: (user: User) => {
      return _firebaseAuth.getIdToken(user)
    },
  }
}
