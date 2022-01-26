import { initializeApp } from 'firebase/app'
// import { getDatabase } from 'firebase/database'
// import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.local.apiKey,
  authDomain: process.env.local.authDomain,
  databaseURL: process.env.local.databaseURL,
  projectId: process.env.local.projectId,
  storageBucket: process.env.local.storageBucket,
  messagingSenderId: process.env.local.messagingSenderId,
  appId: process.env.local.appId,
  measurementId: process.env.local.measurementId
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
// const database = getDatabase(app)
export default app
