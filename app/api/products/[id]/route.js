// api/products/[id]/route.js
import { NextResponse } from 'next/server';
import { db } from '@/app/firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';

export async function GET(request, { params }) {
  const { id } = params; // Get the product ID from the route parameters

  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    
}

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}