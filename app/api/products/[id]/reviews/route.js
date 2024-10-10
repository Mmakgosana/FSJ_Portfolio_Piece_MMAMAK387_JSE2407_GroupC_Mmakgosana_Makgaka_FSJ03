import { NextResponse } from 'next/server';
import { db } from '../../../../firebaseconfig'; // Adjust the path to your firebase config
import { doc, deleteDoc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { verifyIdToken } from '../../../secureendpoint'; // Adjust if needed to your auth verification utility

// Adding a Review
export async function POST(request, { params }) {
  const { id } = params;
  const { rating, comment, reviewerName, reviewerEmail } = await request.json();

  // Verify the user authentication token
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  const decodedToken = await verifyIdToken(token);

  if (!decodedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const reviewId = Date.now().toString(); // Unique review ID based on timestamp
    const reviewData = {
      rating,
      comment,
      date: new Date(),
      reviewerName,
      reviewerEmail,
    };

    await setDoc(doc(db, 'products', id, 'reviews', reviewId), reviewData);

    return NextResponse.json({ message: 'Review added successfully', reviewId });
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json({ error: 'Failed to add review' }, { status: 500 });
  }
}

// Editing a Review
export async function PUT(request, { params }) {
  const { id } = params;
  const { reviewId, rating, comment } = await request.json();

  // Verify the user authentication token
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  const decodedToken = await verifyIdToken(token);

  if (!decodedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const reviewRef = doc(db, 'products', id, 'reviews', reviewId);
    const reviewSnapshot = await getDoc(reviewRef);

    if (!reviewSnapshot.exists()) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    await updateDoc(reviewRef, {
      rating,
      comment,
      date: new Date(), // Update the date
    });

    return NextResponse.json({ message: 'Review updated successfully' });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

// Deleting a Review
export async function DELETE(request, { params }) {
  const { id } = params;
  const { reviewId } = await request.json();

  // Verify the user authentication token
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  const decodedToken = await verifyIdToken(token);

  if (!decodedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const reviewRef = doc(db, 'products', id, 'reviews', reviewId);
    const reviewSnapshot = await getDoc(reviewRef);

    if (!reviewSnapshot.exists()) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    await deleteDoc(reviewRef);

    return NextResponse.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
