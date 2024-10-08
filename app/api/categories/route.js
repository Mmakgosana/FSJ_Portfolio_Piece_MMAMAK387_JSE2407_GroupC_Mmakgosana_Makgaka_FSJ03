// app/api/categories/route.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebaseconfig";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Adjusted collection path to fetch the 'categories' collection directly
    const categoriesCollection = collection(db, "categories");
    const categoriesSnapshot = await getDocs(categoriesCollection);

    // Map through the documents to create a list of categories
    const categories = categoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories." }, { status: 500 });
  }
}
