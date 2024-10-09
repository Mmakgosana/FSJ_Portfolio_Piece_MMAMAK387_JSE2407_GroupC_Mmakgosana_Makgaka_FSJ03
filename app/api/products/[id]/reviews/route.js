import { NextResponse } from 'next/server';
import { db } from '@/app/firebaseconfig';
import { collection, addDoc, serverTimestamp, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

async function authorizeUser() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function POST(request) {
  try {
    const user = await authorizeUser();
    const { productId, rating, comment } = await request.json();
    const reviewerEmail = user.email;
    const reviewerName = user.displayName || 'Anonymous'; // If displayName is not set

    const reviewRef = collection(db, 'products', productId, 'reviews');
    await addDoc(reviewRef, {
      rating,
      comment,
      reviewerEmail,
      reviewerName,
      date: serverTimestamp(),
    });

    return NextResponse.json({ message: "Review added successfully!" });
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json({ error: error.message }, { status: error.message === "Unauthorized" ? 401 : 500 });
  }
}

export async function DELETE(request) {
  try {
    const user = await authorizeUser();
    const { productId, reviewId } = await request.json();

    const reviewRef = doc(db, 'products', productId, 'reviews', reviewId);
    await deleteDoc(reviewRef);

    return NextResponse.json({ message: "Review deleted successfully!" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ error: error.message }, { status: error.message === "Unauthorized" ? 401 : 500 });
  }
}

export async function PATCH(request) {
  try {
    const user = await authorizeUser();
    const { productId, reviewId, rating, comment } = await request.json();

    const reviewRef = doc(db, 'products', productId, 'reviews', reviewId);
    await updateDoc(reviewRef, {
      rating,
      comment,
      date: new Date(),
    });

    return NextResponse.json({ message: "Review updated successfully!" });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json({ error: error.message }, { status: error.message === "Unauthorized" ? 401 : 500 });
  }
}
