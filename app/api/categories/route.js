// /pages/api/productsByCategory.js
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/firebaseconfig";


export default async function handler(req, res) {
  const { category } = req.query;

  if (!category) {
    return res.status(400).json({ error: "Category parameter is required." });
  }

  try {
    const productsCollection = collection(db, "categories", "allCategories");
    const productsQuery = query(productsCollection, where("category", "==", category));
    const productsSnapshot = await getDocs(productsQuery);

    // Map through the documents and format the response
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ error: "Failed to fetch products." });
  }
}
