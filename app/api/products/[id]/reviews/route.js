// pages/api/reviews.js
import { db } from '../../firebase'; // Adjust path as needed
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default async function handler(req, res) {
  const { method } = req;
  const auth = getAuth();
  const user = auth.currentUser;

  // Check for user authentication
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: You must be logged in to perform this action.' });
  }

  switch (method) {
    case 'POST':
      // Adding a review
      const { productId, review } = req.body;

      try {
        const reviewRef = doc(db, "products", productId, "reviews", review.id);
        await setDoc(reviewRef, {
          ...review,
          date: new Date(),
          reviewerEmail: user.email, // Save user email
          reviewerName: user.displayName || user.email // Use displayName or email as reviewer name
        });
        return res.status(200).json({ message: 'Review added successfully', review });
      } catch (error) {
        console.error("Error adding review: ", error);
        return res.status(500).json({ error: 'Failed to add review' });
      }

    case 'PUT':
      // Editing a review
      const { id, updatedReview } = req.body;

      try {
        const reviewRef = doc(db, "products", updatedReview.productId, "reviews", id);
        await setDoc(reviewRef, { ...updatedReview, date: new Date() }, { merge: true });
        return res.status(200).json({ message: 'Review updated successfully', review: { ...updatedReview, date: new Date() } });
      } catch (error) {
        console.error("Error updating review: ", error);
        return res.status(500).json({ error: 'Failed to update review' });
      }

    case 'DELETE':
      // Deleting a review
      const { reviewId, productIdToDelete } = req.body;

      try {
        const reviewRef = doc(db, "products", productIdToDelete, "reviews", reviewId);
        await deleteDoc(reviewRef);
        return res.status(200).json({ message: 'Review deleted successfully' });
      } catch (error) {
        console.error("Error deleting review: ", error);
        return res.status(500).json({ error: 'Failed to delete review' });
      }

    default:
      res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
