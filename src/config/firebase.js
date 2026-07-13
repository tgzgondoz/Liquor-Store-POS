import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, onValue, remove, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAHC2e_fIDMyJQbeJ0RCBg-YMr3r25JEoM",
  authDomain: "liqourstorepos-14bb5.firebaseapp.com",
  projectId: "liqourstorepos-14bb5",
  storageBucket: "liqourstorepos-14bb5.firebasestorage.app",
  messagingSenderId: "43990072821",
  appId: "1:43990072821:web:0518d99ae75a4d9f71b4bc",
  measurementId: "G-ZDGLFHYY7X"
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