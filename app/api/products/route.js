// /pages/api/products.js
import {collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebaseconfig";



export default async function handler(req, res) {
  try {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);

    // Map through the documents and format the response
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products." });
  }
}
