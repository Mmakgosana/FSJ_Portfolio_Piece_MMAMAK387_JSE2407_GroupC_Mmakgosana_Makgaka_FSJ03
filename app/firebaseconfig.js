// app/api/products/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCTw1Wq0Q_E3eOvOELbPr7Q8Ht9jc4oizc",
    authDomain: "next-ecommerce-e3d6c.firebaseapp.com",
    projectId: "next-ecommerce-e3d6c",
    storageBucket: "next-ecommerce-e3d6c.appspot.com",
    messagingSenderId: "398258298281",
    appId: "1:398258298281:web:64cee2b828590d5eab78b8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

