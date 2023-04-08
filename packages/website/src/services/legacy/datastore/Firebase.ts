// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  Analytics,
  getAnalytics,
  logEvent,
  setUserId,
  setUserProperties,
} from '@firebase/analytics'
import { getApp, getApps, initializeApp } from '@firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  TwitterAuthProvider,
  UserCredential,
} from '@firebase/auth'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  OrderByDirection,
  query,
  QueryDocumentSnapshot,
  setDoc,
  where,
} from '@firebase/firestore/lite'
import {
  dexToDocument,
  documentToDex,
  normalizeDocumentToDex,
  PresetDexMap,
} from '#/features/legacy/livingdex/livingdex'
import tracker from '#/services/legacy/metrics/tracker'
import { debug, getUtcTimestamp } from '#/utils/legacyUtils'
import config from '../../../config'
import {
  CollectionType,
  Dex,
  DexList,
  RawUserOwnedDocument,
  User,
  UserOwnedDocument,
} from './Entities'

// The Firebase config object including the API Key, is considered public
// https://firebase.google.com/docs/projects/learn-more#config-files-objects

// Initialize Firebase
if (!getApps().length) {
  // to avoid initializing multiple times (this will run in the client and server)
  initializeApp(config.services.firebase)
}

const app = getApp()
let analytics: Analytics | null = null
if (app.name && typeof window !== 'undefined') {
  // TODO: depending on cookie acceptance, we need to avoid initializing analytics
  analytics = getAnalytics(app)
}

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)
auth.useDeviceLanguage()

/*
  --------------------------------------------------------------------
      Database
  --------------------------------------------------------------------
 */

const db = getFirestore(app)

const NotAuthorizedError = new Error('Not logged in')
const ResourceNotFoundError = new Error('Resource not found')

const payloadWithoutId = <T>(doc: T & UserOwnedDocument) => {
  const { id, ...payload } = doc // remove id from payload
  return payload
}

const removeDocument = async (type: CollectionType, id: string): Promise<void> => {
  return deleteDoc(doc(db, type, id))
}

const addDocument = async (type: CollectionType, data: RawUserOwnedDocument): Promise<string> => {
  if (!auth.currentUser?.uid) {
    return new Promise((resolve, reject) => {
      reject(NotAuthorizedError)
    })
  }
  data.userId = auth.currentUser.uid
  data.createdAt = data.updatedAt = getUtcTimestamp()

  const docRef = await addDoc(collection(db, type), payloadWithoutId(data))
  data.id = docRef.id

  return docRef.id
}

const updateDocument = async (
  type: CollectionType,
  id: string,
  data: RawUserOwnedDocument
): Promise<void> => {
  if (!auth.currentUser?.uid || auth.currentUser?.uid !== data.userId) {
    return new Promise((resolve, reject) => {
      reject(NotAuthorizedError)
    })
  }
  await setDoc(doc(db, type, id), payloadWithoutId({ ...data, updatedAt: getUtcTimestamp() }))
}

const getDocument = async <T>(type: CollectionType, id: string): Promise<T & UserOwnedDocument> => {
  const docRef = doc(db, type, id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return querySnapshotToDocument<T>(docSnap)
  }
  return new Promise((resolve, reject) => {
    reject(new Error(`Resource ${type}/${id} not found`))
  })
}

const querySnapshotToDocument = <T>(snap: QueryDocumentSnapshot): T & UserOwnedDocument => {
  const data = snap.data()
  data.id = snap.id
  return data as T & UserOwnedDocument
}

const searchDocuments = async <T>(
  type: CollectionType,
  criteria: { [key: string]: any },
  sortBy: [string, OrderByDirection] = ['createdAt', 'asc'],
  maxResults: number = 10
): Promise<Array<T & UserOwnedDocument>> => {
  const collectionRef = collection(db, type)
  const whereClauses = Object.entries(criteria).map(([key, value]) => {
    return where(key, '==', value)
  })
  const q = query(collectionRef, ...whereClauses, orderBy(...sortBy), limit(maxResults))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(docSnap => querySnapshotToDocument<T>(docSnap))
}

const searchDocument = async <T>(
  type: CollectionType,
  criteria: { [key: string]: any }
): Promise<T & UserOwnedDocument> => {
  return searchDocuments<T>(type, criteria).then(docs => {
    if (docs.length) {
      return docs[0]
    }
    return new Promise((resolve, reject) => {
      reject(new Error(`Resource ${type} not found`))
    })
  })
}

// export const findHomeDexByUser = async (userId: string): Promise<Dex> => {
//   return findDocument<Dex>('dexes', {userId, game: 'home'})
// }

export const findDexesByUser = async (userId: string): Promise<DexList> => {
  return searchDocuments<RawUserOwnedDocument>('dexes', { userId }, ['updatedAt', 'desc'], 20).then(
    rawDocs => {
      return rawDocs.map(rawDoc => documentToDex(rawDoc))
    }
  )
}

const getDex = async (id: string): Promise<RawUserOwnedDocument> => {
  return getDocument<RawUserOwnedDocument>('dexes', id)
}

export const getNormalizedDex = async (id: string, presets: PresetDexMap): Promise<Dex> => {
  return getDex(id)
    .then(rawDoc => {
      // clog("getDex", rawDoc)
      return rawDoc
    })
    .then(rawDoc => normalizeDocumentToDex(rawDoc, presets))
}

export const saveDex = async (dex: Dex): Promise<string> => {
  const storableDex = dexToDocument(dex)
  const dexId = dex.id

  debug('saveDex', storableDex)

  if (dexId === null) {
    return addDocument('dexes', storableDex).then(dexId => {
      tracker.dexCreated(dexId, dex)
      return dexId
    })
  }

  return updateDocument('dexes', dexId, storableDex).then(() => {
    tracker.dexUpdated(dex)
    return dexId
  })
}

export const removeDex = async (id: string): Promise<void> => {
  return removeDocument('dexes', id).then(() => {
    tracker.dexRemoved(id)
  })
}

/*
  --------------------------------------------------------------------
       Authentication
  --------------------------------------------------------------------
 */
export const createUserWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  // Promise<UserCredential>
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const loginWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  // Promise<UserCredential>
  return await signInWithEmailAndPassword(auth, email, password)
}

export const loginWithTwitter = async (): Promise<UserCredential> => {
  // Promise<UserCredential>
  return await signInWithPopup(auth, new TwitterAuthProvider())
}

export const loginWithGoogle = async (): Promise<UserCredential> => {
  // Promise<UserCredential>
  return await signInWithPopup(auth, new GoogleAuthProvider())
}

export const loginWithGithub = async (): Promise<UserCredential> => {
  // Promise<UserCredential>
  return await signInWithPopup(auth, new GithubAuthProvider())
}

export const onAuthStateChanged = (callback: (user: User | null, error: Error | null) => void) => {
  auth.onAuthStateChanged(
    async user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        callback(
          {
            uid: user.uid,
            email: user.email as string,
            displayName: user.displayName as string,
            pictureUrl: user.photoURL as string,
          },
          null
        )
      } else {
        callback(null, null)
      }
    },
    error => {
      callback(null, error)
    }
  )
}

export const logout = async () => {
  await auth.signOut()
}

const fb = {
  app,
  auth,
  analytics,
  trackAnalyticsEvent: (eventName: string, properties?: { [key: string]: any }) => {
    if (!analytics) {
      return
    }
    logEvent(analytics, eventName, properties)
  },
  setAnalyticsUserId: (userId: string) => {
    if (!analytics) {
      return
    }
    setUserId(analytics, userId)
  },
  setAnalyticUserProperties: (properties: { [key: string]: any }) => {
    if (!analytics) {
      return
    }
    setUserProperties(analytics, properties)
  },
}

export default fb

/**
 Considerations:

 - Nested arrays are not supported. E.g. {boxes: [ [{id:"bulbasaur"}, ...], [ {id:"nidoqueen"}, ... ] ]}
 */
