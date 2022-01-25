import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBr7ckeffTE7oPO9qrp7U9uXIY9dP2DVrY',
  authDomain: 'finance-511e9.firebaseapp.com',
  projectId: 'finance-511e9',
  storageBucket: 'finance-511e9.appspot.com',
  messagingSenderId: '146572201532',
  appId: '1:146572201532:web:764fa21af1496d6b9abd39',
  measurementId: 'G-BNEDSBMQQB'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
export default app
