import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCRW66BF8k79YhctjxRnDNYAywLZEZUO20",
  authDomain: "chat-app-cb8c5.firebaseapp.com",
  projectId: "chat-app-cb8c5",
  storageBucket: "chat-app-cb8c5.appspot.com",
  messagingSenderId: "297977524416",
  appId: "1:297977524416:web:a0c3823816cbef1dbdbd25",
  measurementId: "G-7BJJKMMZX9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
