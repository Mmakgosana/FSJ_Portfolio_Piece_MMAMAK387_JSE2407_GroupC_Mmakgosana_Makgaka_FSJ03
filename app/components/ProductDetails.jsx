import ProductImageCarousel from './ProductImageCarousel';

export default function ProductDetails({ product }) {
  return (
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
          {product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <div key={review.id} className="mb-4 border-b pb-4">
                <p className="font-medium">
                  {review.name} -{' '}
                  <span className="text-gray-500">{review.date}</span>
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
  );
}
