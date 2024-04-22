
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyAjyMAy0lF-_IfhmA5186keTF2wzNoTIFs",
  authDomain: "fir-course-9f0f9.firebaseapp.com",
  projectId: "fir-course-9f0f9",
  storageBucket: "fir-course-9f0f9.appspot.com",
  messagingSenderId: "82931572569",
  appId: "1:82931572569:web:b29d4627e5dc5e30b57648",
  measurementId: "G-0Y7HREG4CD"
};


const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)
 export const googleProvider = new GoogleAuthProvider()
 export const  db = getFirestore(app)
export const storage =getStorage()