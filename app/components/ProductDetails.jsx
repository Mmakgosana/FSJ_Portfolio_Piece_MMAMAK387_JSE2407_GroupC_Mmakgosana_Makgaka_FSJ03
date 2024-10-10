"use client"

import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // Update with your path to firebase.js
import Head from "next/head";
import ProductImageCarousel from "./ProductImageCarousel";

export default function ProductDetails({ product }) {
  const [sortOrder, setSortOrder] = useState("newest");
  const [reviews, setReviews] = useState([...product.reviews]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReview, setCurrentReview] = useState({
    id: null,
    reviewerName: '',
    comment: '',
    rating: ''
  });
  const [user, setUser] = useState(null);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // User is logged in or logged out
    });
    return () => unsubscribe();
  }, []);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOrder === "newest") return new Date(b.date) - new Date(a.date);
    if (sortOrder === "oldest") return new Date(a.date) - new Date(b.date);
    if (sortOrder === "highestRating") return b.rating - a.rating;
    if (sortOrder === "lowestRating") return a.rating - b.rating;
    return 0;
  });

  const handleSaveReview = () => {
    if (!user) {
      alert("You must be logged in to add a review.");
      return;
    }
    if (isEditing) {
      setReviews(reviews.map((review) =>
        review.id === currentReview.id
          ? { ...review, ...currentReview, date: new Date() }
          : review
      ));
    } else {
      setReviews([...reviews, { ...currentReview, id: Date.now(), date: new Date() }]);
    }
    setIsEditing(false);
    setCurrentReview({ id: null, reviewerName: '', comment: '', rating: '' });
  };

  const handleDeleteReview = async (id) => {
  if (!user) {
    alert("You must be logged in to delete a review.");
    return;
  }

  try {
    // Delete the review from Firestore
    await deleteDoc(doc(db, "products", product.id, "reviews", id));

    // Update the local state to remove the deleted review
    setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
  } catch (error) {
    console.error("Error deleting review: ", error);
  }
};


  const handleEditReview = (review) => {
    if (!user) {
      alert("You must be logged in to edit a review.");
      return;
    }
    setIsEditing(true);
    setCurrentReview(review);
  };

  return (
    <div>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
      </Head>

      {/* Product Details Section */}
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-96 mb-8">
          {product.images.length > 1 ? (
            <ProductImageCarousel images={product.images} />
          ) : (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        <div className="flex-1 md:ml-8">
          <h1 className="text-3xl font-bold mb-6">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-2">Price: <span className="text-blue-500">${product.price}</span></p>
          <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>
          <p className="text-sm text-gray-500 mb-2">Tags: {product.tags.join(', ')}</p>
          <p className="text-sm text-gray-500 mb-4">Rating: {product.rating}</p>
          <p className={`text-sm font-medium mb-6 ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {product.stock > 0 ? 'In stock' : 'Out of stock'}
          </p>

          {/* Reviews Section */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Reviews</h3>
            <div className="mb-4">
              <label htmlFor="sortOrder" className="text-sm font-medium mr-2">Sort by:</label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highestRating">Highest Rating</option>
                <option value="lowestRating">Lowest Rating</option>
              </select>
            </div>

            {sortedReviews.length > 0 ? (
              sortedReviews.map((review) => (
                <div key={review.id} className="mb-4 border-b pb-4">
                  <p className="font-medium">{review.reviewerName} - <span className="text-gray-500">{new Date(review.date).toLocaleDateString()}</span></p>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                  <p className="text-sm font-semibold">Rating: {review.rating}</p>
                  {user && (
                    <>
                      <button onClick={() => handleEditReview(review)} className="text-blue-500 text-sm mr-2">Edit</button>
                      <button onClick={() => handleDeleteReview(review.id)} className="text-red-500 text-sm">Delete</button>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No reviews yet.</p>
            )}
          </div>

          {/* Add/Edit Review Section */}
          {user && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">{isEditing ? "Edit Review" : "Add a Review"}</h3>
              <input
                type="text"
                placeholder="Your Name"
                value={currentReview.reviewerName}
                onChange={(e) => setCurrentReview({ ...currentReview, reviewerName: e.target.value })}
                className="w-full mb-2 p-2 border rounded-md"
              />
              <textarea
                placeholder="Your Review"
                value={currentReview.comment}
                onChange={(e) => setCurrentReview({ ...currentReview, comment: e.target.value })}
                className="w-full mb-2 p-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Rating (1-5)"
                min="1"
                max="5"
                value={currentReview.rating}
                onChange={(e) => setCurrentReview({ ...currentReview, rating: Number(e.target.value) })}
                className="w-full mb-2 p-2 border rounded-md"
              />
              <button onClick={handleSaveReview} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                {isEditing ? "Save Changes" : "Add Review"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
