// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLovacpEYM025STZOQJkf0vqU5sa-biUk",
  authDomain: "note-6bfbe.firebaseapp.com",
  projectId: "note-6bfbe",
  storageBucket: "note-6bfbe.appspot.com",
  messagingSenderId: "594008555440",
  appId: "1:594008555440:web:0766f12f09968995fee075",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
