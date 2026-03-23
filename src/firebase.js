import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app;
let db;

try {
  // Only initialize if we have a config (or if project ID exists)
  if (firebaseConfig.projectId) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } else {
    console.warn("Firebase config not found. You will need to fill out .env.local to persist data.");
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { app, db };
