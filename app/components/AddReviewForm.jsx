import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin'; // Adjust the import path
import { getAuth } from 'firebase-admin/auth'; // Use Firebase Admin auth

export async function POST(request) {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await getAuth().verifyIdToken(token);
    const { productId, rating, comment } = await request.json();
    const reviewerEmail = user.email;
    const reviewerName = user.displayName || 'Anonymous'; // If displayName is not set

    const reviewRef = db.collection('products').doc(productId).collection('reviews');
    await reviewRef.add({
      rating,
      comment,
      reviewerEmail,
      reviewerName,
      date: new Date(),
    });

    return NextResponse.json({ message: "Review added successfully!" });
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
