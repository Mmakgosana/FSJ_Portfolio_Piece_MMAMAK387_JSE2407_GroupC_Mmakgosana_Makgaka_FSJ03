"use client";
import { useState } from "react";

export default function ProductImageCarousel({ images }) {
  const [currentImage, setCurrentImage] = useState(0);

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-96">
      {/* Display the current image */}
      <img
        src={images[currentImage]}
        alt={`Product image ${currentImage + 1}`}
        className="w-full h-full object-contain"
      />

      {/* Left arrow */}
      {images.length > 1 && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
          onClick={handlePrevImage}
        >
          &#8592; {/* Left arrow symbol */}
        </button>
      )}

      {/* Right arrow */}
      {images.length > 1 && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
          onClick={handleNextImage}
        >
          &#8594; {/* Right arrow symbol */}
        </button>
      )}
    </div>
  );
}
