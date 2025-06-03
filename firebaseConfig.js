// firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Your exact config
const firebaseConfig = {
  apiKey: "AIzaSyBGAMovZd0v-M2sj8fna3pkJJRI8Dgl4rc",
  authDomain: "chatapp-4840f.firebaseapp.com",
  projectId: "chatapp-4840f",
  storageBucket: "chatapp-4840f.appspot.com",
  messagingSenderId: "1045157353122",
  appId: "1:1045157353122:web:8894f53a74f0104367e9fb",
  measurementId: "G-G7432FFNB1"
};

// ✅ Guard against re-initialization
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase initialized');
} else {
  app = getApp();
}

const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
