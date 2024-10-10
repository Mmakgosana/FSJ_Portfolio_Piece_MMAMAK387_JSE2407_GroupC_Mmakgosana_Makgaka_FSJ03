"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import SortOptions from "./components/SortOptions";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Pagination from "./components/Pagination"; // Ensure to import Pagination

async function fetchProducts(params) {
  const queryString = new URLSearchParams({
    ...params,
  }).toString();
  const res = await fetch(`/api/products?${queryString}`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

const fetchCategories = async () => {
  const response = await fetch('/api/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const data = await response.json();
  return data.categories || [];
};

export default function ProductsPage() {
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("price");
  const [selectedOrder, setSelectedOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProductsData = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        searchTerm: searchQuery,
        category: selectedCategory,
        sort: selectedSort,
        order: selectedOrder,
        page: currentPage,
      };
      const data = await fetchProducts(params);
      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    }
    setIsLoading(false);
  }, [searchQuery, selectedCategory, selectedSort, selectedOrder, currentPage]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    fetchProductsData();
  }, [fetchProductsData]);

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    
    const searchParam = searchParams.get("search") || "";
    const categoryParam = searchParams.get("category") || "";
    const sortParam = searchParams.get("sort") || "price";
    const orderParam = searchParams.get("order") || "asc";
    const pageParam = parseInt(searchParams.get("page"), 10) || 1;

    setSearchQuery(searchParam);
    setSelectedCategory(categoryParam);
    setSelectedSort(sortParam);
    setSelectedOrder(orderParam);
    setCurrentPage(pageParam);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams({
      search: searchQuery,
      category: selectedCategory,
      sort: selectedSort,
      order: selectedOrder,
      page: currentPage,
    }).toString();
    router.push(`?${query}`, { scroll: false });
  }, [searchQuery, selectedCategory, selectedSort, selectedOrder, currentPage, router]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
    setCurrentPage(1);
  };

  const handleOrderChange = (orderOption) => {
    setSelectedOrder(orderOption);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedSort("price");
    setSelectedOrder("asc");
    setCurrentPage(1);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <div className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search products..."
              className="border rounded px-4 py-2"
            />
            <MagnifyingGlassIcon className="w-5 h-5 ml-2" />
          </div>
        </div>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
        <SortOptions
          selectedSort={selectedSort}
          selectedOrder={selectedOrder}
          onSortChange={handleSortChange}
          onOrderChange={handleOrderChange}
        />
        <button onClick={handleResetFilters} className="mb-4 px-4 py-2 bg-red-500 text-white rounded">
          Reset Filters
        </button>
        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.length > 0 ? (
              products.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <p>No products found.</p>
            )}
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          selectedSortOrder={selectedOrder}
        />
      </main>
      <Footer />
    </div>
  );
}
