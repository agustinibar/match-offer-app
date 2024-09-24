// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmJbPraTe05RLCH588e_7hPrlpHW1WJ1U",
  authDomain: "prosper-5e298.firebaseapp.com",
  projectId: "prosper-5e298",
  storageBucket: "prosper-5e298.appspot.com",
  messagingSenderId: "222021266152",
  appId: "1:222021266152:web:18a1237b13bdd33df7b75d",
  measurementId: "G-3WZ3BGJCJM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)