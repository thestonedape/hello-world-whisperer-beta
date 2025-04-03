
// Firebase configuration and initialization
// Centralizes Firebase service setup for authentication, analytics, firestore, and storage
// IMPORTANT: Firebase configuration is now set with the provided project credentials

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Web app's Firebase configuration for Givzo
const firebaseConfig = {
  apiKey: "AIzaSyAEP90TQEg7FZm_W0MDnQxbp3lR-SsEQKk",
  authDomain: "givzo-7b792.firebaseapp.com",
  projectId: "givzo-7b792",
  storageBucket: "givzo-7b792.firebasestorage.app",
  messagingSenderId: "864600122715",
  appId: "1:864600122715:web:b2475ea5fce97366e7e67e",
  measurementId: "G-LJLL7H7RLV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
