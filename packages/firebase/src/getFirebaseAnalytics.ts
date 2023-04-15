import * as _firebaseAnalytics from '@firebase/analytics'
import * as _firebase from '@firebase/app'

import createMemoizedCallback from '@pkg/utils/src/universal/createMemoizedCallback'

import getFirebaseApp from './getFirebaseApp'

const getFirebaseAnalytics = createMemoizedCallback(() => _createAnalyticsApi(getFirebaseApp()))

export default getFirebaseAnalytics

function _createAnalyticsApi(app: _firebase.FirebaseApp) {
  let analytics: _firebaseAnalytics.Analytics | null = null
  if (app.name && typeof global.window !== 'undefined') {
    // TODO: depending on cookie acceptance, we need to avoid initializing analytics
    analytics = _firebaseAnalytics.getAnalytics(app)
  }

  return {
    setUserId: (userId: string) => {
      if (!analytics) {
        return
      }
      _firebaseAnalytics.setUserId(analytics, userId)
    },
    logEvent: (name: string, params: Record<string, string>) => {
      if (!analytics) {
        return
      }
      _firebaseAnalytics.logEvent(analytics, name, params)
    },
  }
}
