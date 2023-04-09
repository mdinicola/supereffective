import * as _firebase from '@firebase/app'
import * as _firestore from '@firebase/firestore/lite'

import createMemoizeCallback from '@pkg/utils/src/universal/createMemoizeCallback'

import getFirebaseApp from './getFirebaseApp'

export const getFirestoreDb = createMemoizeCallback(() => _createFirestoreApi(getFirebaseApp()))

export default getFirestoreDb

export type FirestoreDocument = {
  // id from Firestore:
  id?: string
  // these are custom properties that are indexed:
  userId?: string
  createdAt?: Date
  updatedAt?: Date
} & Record<string, unknown>

const _documentWithoutId = (doc: FirestoreDocument): Omit<FirestoreDocument, 'id'> => {
  const { id, ...payload } = doc
  return payload
}

const _snapshotWithId = (doc: _firestore.DocumentSnapshot): FirestoreDocument => {
  return {
    ...doc.data(),
    id: doc.id,
  } as FirestoreDocument
}

function _createFirestoreApi(app: _firebase.FirebaseApp) {
  // Initialize Firebase Firestore and get a reference to the service
  const db = _firestore.getFirestore(app)
  const NotAuthorizedError = new Error('Not logged in')
  const ResourceNotFoundError = new Error('Resource not found')
  const defaultLimit = 25

  const dbApi = {
    createTimestamp: (): Date => {
      return _firestore.Timestamp.now().toDate()
    },

    collection: (collectionPath: string) => {
      return _firestore.collection(db, collectionPath)
    },

    addDocument: async (
      collectionPath: string,
      data: FirestoreDocument,
      userUid: string | undefined
    ): Promise<string> => {
      if (!userUid) {
        return new Promise((resolve, reject) => {
          reject(NotAuthorizedError)
        })
      }
      data.userId = userUid
      data.createdAt = data.updatedAt = dbApi.createTimestamp()

      const docRef = await _firestore.addDoc(
        dbApi.collection(collectionPath),
        _documentWithoutId(data)
      )
      data.id = docRef.id

      return docRef.id
    },

    getDocument: async (collectionPath: string, id: string): Promise<FirestoreDocument> => {
      const docRef = _firestore.doc(db, collectionPath, id)
      const docSnap = await _firestore.getDoc(docRef)
      if (docSnap.exists()) {
        return _firestore.getDoc(docRef).then(_snapshotWithId)
      }
      return new Promise((resolve, reject) => {
        reject(ResourceNotFoundError)
      })
    },

    updateDocument: async (
      collectionPath: string,
      id: string,
      data: FirestoreDocument,
      userUid: string | undefined
    ): Promise<void> => {
      if (!userUid || userUid !== data.userId) {
        return new Promise((resolve, reject) => {
          reject(NotAuthorizedError)
        })
      }
      await _firestore.setDoc(
        _firestore.doc(db, collectionPath, id),
        _documentWithoutId({ ...data, updatedAt: dbApi.createTimestamp() })
      )
    },

    upsertDocument: async (
      collectionPath: string,
      data: FirestoreDocument,
      userUid: string | undefined
    ): Promise<string> => {
      if (!data.id) {
        return dbApi.addDocument(collectionPath, data, userUid)
      }
      await dbApi.updateDocument(collectionPath, data.id, data, userUid)
      return data.id
    },

    deleteDocument: async (collectionPath: string, id: string): Promise<void> => {
      return _firestore.deleteDoc(_firestore.doc(db, collectionPath, id))
    },

    findDocuments: async (
      collectionPath: string,
      criteria: { [key: string]: any },
      sortBy: [string, _firestore.OrderByDirection] = ['createdAt', 'asc'],
      maxResults: number = defaultLimit
    ): Promise<FirestoreDocument[]> => {
      const collectionRef = _firestore.collection(db, collectionPath)

      const whereClauses = Object.entries(criteria).map(([key, value]) => {
        return _firestore.where(key, '==', value)
      })

      const query = _firestore.query(
        collectionRef,
        ...whereClauses,
        _firestore.orderBy(...sortBy),
        _firestore.limit(maxResults)
      )

      return _firestore.getDocs(query).then(snapshot => {
        return snapshot.docs.map(_snapshotWithId)
      })
    },

    findDocument: async (
      collectionPath: string,
      criteria: { [key: string]: any },
      sortBy: [string, _firestore.OrderByDirection] = ['createdAt', 'asc']
    ): Promise<FirestoreDocument> => {
      const collectionRef = _firestore.collection(db, collectionPath)

      const whereClauses = Object.entries(criteria).map(([key, value]) => {
        return _firestore.where(key, '==', value)
      })

      const query = _firestore.query(
        collectionRef,
        ...whereClauses,
        _firestore.orderBy(...sortBy),
        _firestore.limit(1)
      )

      return dbApi.findDocuments(collectionPath, criteria, sortBy, 1).then(docs => {
        if (docs.length === 0) {
          throw ResourceNotFoundError
        }
        return docs[0]
      })
    },

    findDocumentsByUser: async (
      collectionPath: string,
      userUid: string | undefined,
      criteria: { [key: string]: any } = {},
      sortBy: [string, _firestore.OrderByDirection] = ['createdAt', 'desc'],
      maxResults: number = defaultLimit
    ): Promise<FirestoreDocument[]> => {
      if (!userUid) {
        return new Promise((resolve, reject) => {
          reject(NotAuthorizedError)
        })
      }
      return dbApi.findDocuments(
        collectionPath,
        { ...criteria, userId: userUid },
        sortBy,
        maxResults
      )
    },
  }

  return dbApi
}
