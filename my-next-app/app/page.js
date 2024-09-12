"use client";
import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import PaginationControls from './components/PaginationControls';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import Navbar from './components/Navbar';


export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`https://next-ecommerce-api.vercel.app/products?limit=20&page=${currentPage}`);
        const data = await res.json();
        setProducts(data); // Assume API returns a products array and total count
        setTotalPages(data.totalPages); // Total pages info
      } catch (error) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

 return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
