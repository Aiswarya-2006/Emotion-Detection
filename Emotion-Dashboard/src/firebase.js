import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAoXvcn5FGJJ1s8mOCRy5tOx7EO9xwulr0",
  authDomain: "emotion-detection-d51d2.firebaseapp.com",
  databaseURL: "https://emotion-detection-d51d2-default-rtdb.firebaseio.com",
  projectId: "emotion-detection-d51d2",
  storageBucket: "emotion-detection-d51d2.firebasestorage.app",
  messagingSenderId: "61141459319",
  appId: "1:61141459319:web:ad8b08d27885f5633d0172",
  measurementId: "G-WJN1RWLDMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics
const analytics = getAnalytics(app);

// Realtime Database
export const db = getDatabase(app);

export { analytics };