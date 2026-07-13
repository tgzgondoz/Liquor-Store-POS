import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, onValue, remove, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCPTyTlSgsq_HeDKECo-X7pSmmMyRO7YQg",
  authDomain: "liquorstorepos-a1d00.firebaseapp.com",
  databaseURL: "https://liquorstorepos-a1d00-default-rtdb.firebaseio.com",
  projectId: "liquorstorepos-a1d00",
  storageBucket: "liquorstorepos-a1d00.firebasestorage.app",
  messagingSenderId: "862979528108",
  appId: "1:862979528108:web:0a56d46aa3219faa785609",
  measurementId: "G-0TPVPR8B2R"
};

let app = null;
let database = null;

export const initializeFirebase = () => {
  try {
    if (!app) {
      console.log('Initializing Firebase...');
      app = initializeApp(firebaseConfig);
      database = getDatabase(app);
      console.log('Firebase initialized successfully');
    }
    return { app, database };
  } catch (error) {
    console.error('Firebase initialization error details:', error);
    throw error;
  }
};

export const getDatabaseInstance = () => {
  if (!database) {
    initializeFirebase();
  }
  return database;
};

// Export all the functions you need
export { ref, set, push, onValue, remove, update };