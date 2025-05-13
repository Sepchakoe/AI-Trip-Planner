// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOYpJ4tvuAksbVlnu2soFy73B6QZ0OIEw",
  authDomain: "wanderwise-65d09.firebaseapp.com",
  projectId: "wanderwise-65d09",
  storageBucket: "wanderwise-65d09.firebasestorage.app",
  messagingSenderId: "974513371744",
  appId: "1:974513371744:web:02e06731486b0ad0196105"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);