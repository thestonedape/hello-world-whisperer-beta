
// Firebase configuration and initialization
// Centralizes Firebase service setup for authentication, firestore, and storage
// IMPORTANT: Replace the placeholder values with your actual Firebase config
// You will need to create a Firebase project and obtain these values from your Firebase console
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// Replace these placeholder values with your actual Firebase config later
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // REPLACE: Add your Firebase API key here
  authDomain: "YOUR_AUTH_DOMAIN", // REPLACE: Add your Firebase auth domain here
  projectId: "YOUR_PROJECT_ID", // REPLACE: Add your Firebase project ID here
  storageBucket: "YOUR_STORAGE_BUCKET", // REPLACE: Add your Firebase storage bucket here
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // REPLACE: Add your Firebase messaging sender ID here
  appId: "YOUR_APP_ID" // REPLACE: Add your Firebase app ID here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
