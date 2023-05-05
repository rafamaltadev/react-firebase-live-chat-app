import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBM0sy3FnK6mTW-YAy78eib4kVnbiX8KGI",
  authDomain: "chat-8a775.firebaseapp.com",
  projectId: "chat-8a775",
  storageBucket: "chat-8a775.appspot.com",
  messagingSenderId: "268690482514",
  appId: "1:268690482514:web:b182f3ec551510e99f868b",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
