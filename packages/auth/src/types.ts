/**
 * Basic user data, compatible with Firebase's auth User
 */
export type AuthUser<T = {}> = {
  /**
   * The user's unique ID, scoped to the project.
   */
  uid: string
  /**
   * The provider used to authenticate the user.
   */
  providerId: string
  /**
   * The email of the user.
   */
  email: string | null
  /**
   * The display name of the user.
   */
  displayName: string | null
  /**
   * The profile photo URL of the user.
   */
  photoURL: string | null
} & T

export type ReadonlyAuthUser<T = {}> = Readonly<AuthUser<T>>

export enum AuthProviderName {
  Firebase = 'firebase',
  NextAuth = 'next-auth',
}

export enum OAuthProviderName {
  Google = 'google',
  Twitter = 'twitter',
  Github = 'github',
}

export type AuthApi<ProviderUser extends AuthUser = AuthUser> = {
  authProvider: AuthProviderName
  currentUser: ProviderUser | null
  isSignedIn: () => boolean
  signIn: (provider: OAuthProviderName) => Promise<ProviderUser | null>
  signOut: () => Promise<void>
  createUser: (email: string, password: string) => Promise<ProviderUser | null>
}
