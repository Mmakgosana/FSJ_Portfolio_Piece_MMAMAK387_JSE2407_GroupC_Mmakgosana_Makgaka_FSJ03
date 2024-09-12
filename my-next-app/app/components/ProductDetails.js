const ProductDetails = ({ product }) => (
    <div>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <p>Category: {product.category}</p>
      <p>Tags: {product.tags.join(', ')}</p>
      <p>Rating: {product.rating}</p>
      <p>Stock: {product.stock}</p>
      <p>Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</p>
      <div>
        <h3>Reviews</h3>
        {product.reviews.map((review, index) => (
          <div key={index}>
            <p>{review.name} ({review.date})</p>
            <p>{review.comment}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );

  
  
  export default ProductDetails;
  