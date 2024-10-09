"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import SortOptions from "./components/SortOptions";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Fetch products with filters (limit removed)
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

// Fetch categories
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
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("price");
  const [selectedOrder, setSelectedOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);

  const fetchProductsData = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        searchTerm: searchQuery,
        category: selectedCategory,
        sort: selectedSort,
        order: selectedOrder,
      };
      const data = await fetchProducts(params);
      setProducts(data.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    }
    setIsLoading(false);
  }, [searchQuery, selectedCategory, selectedSort, selectedOrder]);

  // Fetch categories on initial load
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

  // Fetch products when filters change
  useEffect(() => {
    fetchProductsData();
  }, [fetchProductsData]);

  // Update URL with current filters
  useEffect(() => {
    const query = new URLSearchParams({
      search: searchQuery,
      category: selectedCategory,
      sort: selectedSort,
      order: selectedOrder,
    }).toString();
    router.push(`?${query}`, { scroll: false });
  }, [searchQuery, selectedCategory, selectedSort, selectedOrder, router]);

  // Parse URL parameters on page load
  useEffect(() => {
    const searchParam = searchParams.get("search") || "";
    const categoryParam = searchParams.get("category") || "";
    const sortParam = searchParams.get("sort") || "price";
    const orderParam = searchParams.get("order") || "asc";

    setSearchQuery(searchParam);
    setSelectedCategory(categoryParam);
    setSelectedSort(sortParam);
    setSelectedOrder(orderParam);
  }, [searchParams]);

  // Handlers for user input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSortOrderSelect = (sort, order) => {
    setSelectedSort(sort);
    setSelectedOrder(order);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedSort("price");
    setSelectedOrder("asc");
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">My Products</h1>

            {/* Search Bar */}
            <div className="mb-4 relative">
              <input
                type="text"
                aria-label="Search for products"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MagnifyingGlassIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>

            {/* Category Filter */}
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />

            {/* Sort Options */}
            <SortOptions
              selectedSort={selectedSort}
              selectedOrder={selectedOrder}
              onSelectSortOrder={handleSortOrderSelect}
            />
            
            {/* Reset Filters Button */}
            <button onClick={resetFilters} className="mt-4 p-2 bg-red-500 text-white rounded">
              Reset Filters
            </button>

            {/* Products Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="loader"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                {products.length === 0 && <p>No products found.</p>}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
