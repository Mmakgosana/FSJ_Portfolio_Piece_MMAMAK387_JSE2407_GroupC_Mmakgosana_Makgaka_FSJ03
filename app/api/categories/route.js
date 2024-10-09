// app/api/categories/route.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebaseconfig";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Fetch the document containing the categories array
    const categoriesDoc = doc(db, "categories", "allCategories");
    const categoriesSnapshot = await getDoc(categoriesDoc);

    if (!categoriesSnapshot.exists()) {
      throw new Error("No categories found");
    }

    const categoriesData = categoriesSnapshot.data();
    const categories = categoriesData.categories.map((category, index) => ({
      id: index,      // Use the index as a unique id
      name: category, // The category string itself
    }));

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories." }, { status: 500 });
  }
}
