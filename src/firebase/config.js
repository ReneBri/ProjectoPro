import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAEstmJVtmSi1b2RXKZK6CPddrZS_yLWxs",
    authDomain: "projectmanagementproject-8aab0.firebaseapp.com",
    projectId: "projectmanagementproject-8aab0",
    storageBucket: "projectmanagementproject-8aab0.appspot.com",
    messagingSenderId: "462163436190",
    appId: "1:462163436190:web:e8f2e6d7c81941371cd18f"
  };

// init firebase
firebase.initializeApp(firebaseConfig)

// initialize products
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }