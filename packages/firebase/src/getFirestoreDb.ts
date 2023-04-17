import * as _firebase from '@firebase/app'
import * as _firestore from '@firebase/firestore/lite'

import createMemoizedCallback from '@pkg/utils/src/caching/createMemoizedCallback'

import getFirebaseApp from './getFirebaseApp'

export const getFirestoreDb = createMemoizedCallback(() => _createFirestoreApi(getFirebaseApp()))

export default getFirestoreDb

export type FirestoreDocument = {
  // id from Firestore:
  id?: string
  // these are custom properties that are indexed:
  userId?: string
  createdAt?: Date
  updatedAt?: Date
} & Record<string, unknown>

const _documentWithoutId = <D extends FirestoreDocument>(doc: D): Omit<D, 'id'> => {
  const { id, ...payload } = doc
  return payload
}

const _snapshotWithId = <D extends FirestoreDocument = FirestoreDocument>(
  doc: _firestore.DocumentSnapshot
): D => {
  return {
    ...doc.data(),
    id: doc.id,
  } as D
}

function _createFirestoreApi(app: _firebase.FirebaseApp) {
  // Initialize Firebase Firestore and get a reference to the service
  const db = _firestore.getFirestore(app)
  const NotAuthorizedError = new Error('Not logged in')
  const ResourceNotFoundError = new Error('Resource not found')
  const defaultLimit = 25

  const collection = (collectionPath: string) => {
    return _firestore.collection(db, collectionPath)
  }

  const dbApi = {
    createTimestamp: (): Date => {
      return _firestore.Timestamp.now().toDate()
    },

    addDocument: async <D extends FirestoreDocument>(
      collectionPath: string,
      data: D,
      userUid: string | undefined
    ): Promise<string> => {
      if (!userUid) {
        return new Promise((resolve, reject) => {
          reject(NotAuthorizedError)
        })
      }
      data.userId = userUid
      data.createdAt = data.updatedAt = dbApi.createTimestamp()

      const docRef = await _firestore.addDoc(collection(collectionPath), _documentWithoutId(data))
      data.id = docRef.id

      return docRef.id
    },

    getDocument: async <D extends FirestoreDocument>(
      collectionPath: string,
      id: string
    ): Promise<D> => {
      const docRef = _firestore.doc(db, collectionPath, id)
      const docSnap = await _firestore.getDoc(docRef)
      if (docSnap.exists()) {
        return _firestore.getDoc(docRef).then(_snapshotWithId<D>)
      }
      return new Promise((resolve, reject) => {
        reject(ResourceNotFoundError)
      })
    },

    updateDocument: async <D extends FirestoreDocument>(
      collectionPath: string,
      id: string,
      data: D,
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

    upsertDocument: async <D extends FirestoreDocument>(
      collectionPath: string,
      data: D,
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

    findDocuments: async <D extends FirestoreDocument>(
      collectionPath: string,
      criteria: { [key: string]: any },
      sortBy: [string, _firestore.OrderByDirection] = ['createdAt', 'asc'],
      maxResults: number = defaultLimit
    ): Promise<Array<D>> => {
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
        return snapshot.docs.map<D>(_snapshotWithId)
      })
    },

    findDocument: async <D extends FirestoreDocument>(
      collectionPath: string,
      criteria: { [key: string]: any },
      sortBy: [string, _firestore.OrderByDirection] = ['createdAt', 'asc']
    ): Promise<D> => {
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

      return dbApi.findDocuments<D>(collectionPath, criteria, sortBy, 1).then(docs => {
        if (docs.length === 0) {
          throw ResourceNotFoundError
        }
        return docs[0]
      })
    },

    findDocumentsByUser: async <D extends FirestoreDocument>(
      collectionPath: string,
      userUid: string | undefined,
      criteria: { [key: string]: any } = {},
      sortBy: [string, _firestore.OrderByDirection] = ['createdAt', 'desc'],
      maxResults: number = defaultLimit
    ): Promise<Array<D>> => {
      if (!userUid) {
        return new Promise((resolve, reject) => {
          reject(NotAuthorizedError)
        })
      }
      return dbApi.findDocuments<D>(
        collectionPath,
        { ...criteria, userId: userUid },
        sortBy,
        maxResults
      )
    },
  }

  return dbApi
}
