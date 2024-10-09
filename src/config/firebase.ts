// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBaD85k8bbNHJ1dqXDY9XwB0NsRlyWso0E",
  authDomain: "alta-managersystem.firebaseapp.com",
  projectId: "alta-managersystem",
  storageBucket: "alta-managersystem.appspot.com",
  messagingSenderId: "480114985895",
  appId: "1:480114985895:web:513c996d6910cae0404482",
  measurementId: "G-HSHRH0KLS5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
