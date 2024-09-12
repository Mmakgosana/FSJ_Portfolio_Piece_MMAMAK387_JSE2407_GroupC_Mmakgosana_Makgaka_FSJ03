"use client";

import { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async (page) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://next-ecommerce-api.vercel.app/products?_page=${page}&_limit=20`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(prevProducts => [...prevProducts, ...data]);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  const ProductDetails = ({ product }) => (
    <div>
      <h1>{product.title}</h1>
      <img src={product.images[0]} alt={product.title} className="h-64 object-contain" />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Rating: {product.rating}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
  
  return (
    <div>
      <h1>Products</h1>
      {error && <div>{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={handleLoadMore} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
          Load More
        </button>
      )}
    </div>
  );
};

export default ProductsPage;
