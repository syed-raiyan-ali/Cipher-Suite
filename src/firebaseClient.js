// firebaseClient.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwMMiSh8JIECpW4YC6oeZzl6P9MjWW29Q",
  authDomain: "cipher-suite-cc6b9.firebaseapp.com",
  projectId: "cipher-suite-cc6b9",
  storageBucket: "cipher-suite-cc6b9.firebasestorage.app",
  messagingSenderId: "818997762182",
  appId: "1:818997762182:web:9745775fe7b5dcebb35907",
  measurementId: "G-GM1LJDX52M"
};

// Check if Firebase has already been initialized. 
// If yes, use the existing app instance. If no, initialize a new one.
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);

// Initialize and export Firestore DB using the safe instance
export const db = getFirestore(app);