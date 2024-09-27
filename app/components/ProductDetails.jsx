"use client"; // Add this directive at the top

import React, { useState } from "react";
import Head from "next/head"; // Import Head component for meta tags
import ProductImageCarousel from './ProductImageCarousel';

export default function ProductDetails({ product }) {
  // State to manage review sorting
  const [sortOrder, setSortOrder] = useState("newest"); // Default sort by newest

  // Function to handle review sorting
  const sortedReviews = [...product.reviews].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.date) - new Date(a.date); // Newest first
    } else if (sortOrder === "oldest") {
      return new Date(a.date) - new Date(b.date); // Oldest first
    } else if (sortOrder === "highestRating") {
      return b.rating - a.rating; // Highest rating first
    } else if (sortOrder === "lowestRating") {
      return a.rating - b.rating; // Lowest rating first
    }
    return 0; // Default case
  });

  return (
    <div>
      {/* Dynamic Head section for meta tags */}
      <Head>
        <title>{product.title}</title> {/* Set the document title */}
        <meta name="description" content={product.description} /> {/* Set the meta description */}
      </Head>

      <div className="flex flex-col md:flex-row">
        {/* Display either a single image or a carousel */}
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
          <p className="text-xl font-semibold mb-2">
            Price: <span className="text-blue-500">${product.price}</span>
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Category: {product.category}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Tags: {product.tags.join(', ')}
          </p>
          <p className="text-sm text-gray-500 mb-4">Rating: {product.rating}</p>
          <p
            className={`text-sm font-medium mb-6 ${
              product.stock > 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {product.stock > 0 ? 'In stock' : 'Out of stock'}
          </p>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Reviews</h3>

            {/* Sort options */}
            <div className="mb-4">
              <label htmlFor="sortOrder" className="text-sm font-medium mr-2">
                Sort by:
              </label>
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

            {/* Display reviews */}
            {sortedReviews.length > 0 ? (
              sortedReviews.map((review) => (
                <div key={review.id} className="mb-4 border-b pb-4">
                  <p className="font-medium">
                    {review.reviewerName} -{' '}
                    <span className="text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                  <p className="text-sm font-semibold">Rating: {review.rating}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
