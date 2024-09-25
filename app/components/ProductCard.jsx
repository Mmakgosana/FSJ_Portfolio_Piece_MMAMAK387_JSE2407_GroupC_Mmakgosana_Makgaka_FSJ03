// components/ProductCard.js
import Link from "next/link";
import ProductImageCarousel from "./ProductImageCarousel";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Display carousel if there are multiple images */}
      
      {product.images.length > 1 ? (
        <ProductImageCarousel images={product.images} />
      ) : (
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-40 w-full object-contain"
        />
      )}
      
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.title}
        </h2>
        <p className="text-blue-600 font-bold mt-2">${product.price}</p>
        <p className="text-gray-500 text-sm">{product.category}</p>
        <Link
          href={`/${product.id}`}
          className="block mt-4 text-center px-4 py-2 bg-pink-400
           text-white rounded-lg hover:bg-purple-500 transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}