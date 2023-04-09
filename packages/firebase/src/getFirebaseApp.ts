import * as _firebase from '@firebase/app'

import config from '../config.json'

const getFirebaseApp = () => {
  // Initialize Firebase
  if (!_firebase.getApps().length) {
    // to avoid initializing multiple times (this might run in both the client and server)
    _firebase.initializeApp(config.firebase.publicConfig)
    // The Firebase config object including the API Key, is considered public
    // https://firebase.google.com/docs/projects/learn-more#config-files-objects
    // https://firebase.google.com/docs/web/setup#available-libraries
  }

  return _firebase.getApp()
}

export default getFirebaseApp
