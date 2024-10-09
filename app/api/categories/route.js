import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Reference to the 'allCategories' document in the 'categories' collection
    const categoriesDocRef = doc(db, "categories", "allCategories");
    const categoriesDocSnapshot = await getDoc(categoriesDocRef);

    // Check if the document exists and extract the categories field
    if (categoriesDocSnapshot.exists()) {
      const categoriesData = categoriesDocSnapshot.data();
      const categories = categoriesData.categories || []; // Default to an empty array if undefined

      return NextResponse.json({ categories });
    } else {
      return NextResponse.json({ error: "Categories not found." }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories." }, { status: 500 });
  }
}
