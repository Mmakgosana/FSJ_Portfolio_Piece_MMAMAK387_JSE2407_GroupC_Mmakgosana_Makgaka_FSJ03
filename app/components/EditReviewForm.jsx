import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin'; // Adjust the import path
import { getAuth } from 'firebase-admin/auth'; // Use Firebase Admin auth

export async function PATCH(request) {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await getAuth().verifyIdToken(token);
    const { productId, reviewId, rating, comment } = await request.json();

    const reviewRef = db.collection('products').doc(productId).collection('reviews').doc(reviewId);
    await reviewRef.update({
      rating,
      comment,
      date: new Date(),
    });

    return NextResponse.json({ message: "Review updated successfully!" });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
