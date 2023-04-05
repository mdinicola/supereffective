const servicesConfig = {
  firebase: {
    apiKey: 'AIzaSyDtCh5Bs9YaGXqisXcuXJFLop0w9DaunKQ',
    authDomain: 'supereffective-gg.firebaseapp.com',
    projectId: 'supereffective-gg',
    storageBucket: 'supereffective-gg.appspot.com',
    messagingSenderId: '956042036019',
    appId: '1:956042036019:web:d3c55e9466d3b7708b3446',
    measurementId: 'G-48QLCEFF33',
  },
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
  },
}

export default servicesConfig
