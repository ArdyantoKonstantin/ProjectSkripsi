// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-5eS7vDklREXB5Vg0ivfk9b0VmGeDI3g",
  authDomain: "anxiety-expert-system.firebaseapp.com",
  projectId: "anxiety-expert-system",
  storageBucket: "anxiety-expert-system.appspot.com",
  messagingSenderId: "650308727801",
  appId: "1:650308727801:web:7930fdc7ae247eb4e2c328"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)