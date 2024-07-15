// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW7Blvt3aJD7Z5aj70ASptFpy118m-cZY",
  authDomain: "cart-61241.firebaseapp.com",
  projectId: "cart-61241",
  storageBucket: "cart-61241.appspot.com",
  messagingSenderId: "294089218804",
  appId: "1:294089218804:web:1d09ff4f2bdca411e91ca1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const auth = getAuth(app)

export const provider = new GoogleAuthProvider()

export const fbProvider = new FacebookAuthProvider()
