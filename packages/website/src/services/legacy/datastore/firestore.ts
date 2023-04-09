import { getApp, getApps, initializeApp } from '@firebase/app'
import { getAuth } from '@firebase/auth'
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
import { debug, getUtcTimestamp } from '#/utils/legacyUtils'

import config from '../../../config'
import { CollectionType, Dex, DexList, RawUserOwnedDocument, UserOwnedDocument } from './types'

// Initialize Firebase
if (!getApps().length) {
  // to avoid initializing multiple times (this will run in the client and server)
  initializeApp(config.services.firebase)
}

const app = getApp()
const auth = getAuth(app)
const db = getFirestore(app)

const NotAuthorizedError = new Error('Not logged in')

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

export const findDexesByUser = async (userId: string): Promise<DexList> => {
  return searchDocuments<RawUserOwnedDocument>('dexes', { userId }, ['updatedAt', 'desc'], 50).then(
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
  /*
   Considerations:

   - Nested arrays are not supported. E.g. {boxes: [ [{id:"bulbasaur"}, ...], [ {id:"nidoqueen"}, ... ] ]}
   */

  const storableDex = dexToDocument(dex)
  const dexId = dex.id

  debug('saveDex', storableDex)

  if (dexId === null) {
    return addDocument('dexes', storableDex).then(dexId => {
      // tracker.dexCreated(dexId, dex)
      return dexId
    })
  }

  return updateDocument('dexes', dexId, storableDex).then(() => {
    // tracker.dexUpdated(dex)
    return dexId
  })
}

export const removeDex = async (id: string): Promise<void> => {
  return removeDocument('dexes', id).then(() => {
    // tracker.dexRemoved(id)
  })
}
