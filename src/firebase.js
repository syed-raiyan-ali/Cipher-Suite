import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwMMiSh8JIECpW4YC6oeZzl6P9MjWW29Q",
  authDomain: "cipher-suite-cc6b9.firebaseapp.com",
  projectId: "cipher-suite-cc6b9",
  storageBucket: "cipher-suite-cc6b9.appspot.com",  // fixed "firebasestorage.app" typo to "appspot.com"
  messagingSenderId: "818997762182",
  appId: "1:818997762182:web:9745775fe7b5dcebb35907",
  measurementId: "G-GM1LJDX52M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth & Google Provider for sign-in
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Export Firestore DB instance
export const db = getFirestore(app);

// (Optional) Export Analytics instance -- only use if needed in your app
export const analytics = getAnalytics(app);