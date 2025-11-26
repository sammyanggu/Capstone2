// Firebase configuration and authentication setup.
// Exports auth, provider, Firestore, and Cloud Functions for use in the app.

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyD8gYUFyPu0LOhOIZknbjf4jlZTTrJgNKM",
  authDomain: "capstone-0630-bsit.firebaseapp.com",
  projectId: "capstone-0630-bsit",
  databaseURL: "https://capstone-0630-bsit-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "capstone-0630-bsit.appspot.com",
  messagingSenderId: "487897853864",
  appId: "1:487897853864:web:59548f6a0c74d8ffc3b79d",
  measurementId: "G-LGYQ75SS5G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const functions = getFunctions(app, 'asia-southeast1');

setPersistence(auth, browserLocalPersistence).catch(error => {
  console.error('Failed to set persistence:', error);
});

export const provider = new GoogleAuthProvider();
