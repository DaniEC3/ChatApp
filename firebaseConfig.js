import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBGAMovZd0v-M2sj8fna3pkJJRI8Dgl4rc",
  authDomain: "chatapp-4840f.firebaseapp.com",
  projectId: "chatapp-4840f",
  storageBucket: "chatapp-4840f.firebasestorage.app",
  messagingSenderId: "1045157353122",
  appId: "1:1045157353122:web:8894f53a74f0104367e9fb",
  measurementId: "G-G7432FFNB1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };