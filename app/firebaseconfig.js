// app/api/products/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDFKl_nAx2hYW17CeWvKtk85Gvi26xiE2I",
    authDomain: "next-ecommerce-d37e4.firebaseapp.com",
    projectId: "next-ecommerce-d37e4",
    storageBucket: "next-ecommerce-d37e4.appspot.com",
    messagingSenderId: "104970121917",
    appId: "1:104970121917:web:2a642ec9f1ae35d87e3dd4"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

