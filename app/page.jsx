"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import SortOptions from "./components/SortOptions";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Head from "next/head";


// Custom debounce function
function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);

  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
}

// Fetch products with query parameters
async function fetchProducts(page = 1, searchQuery = "", category = "", sort="") {
  const skip = (page - 1) * 20;
  const res = await fetch(
    `https://next-ecommerce-api.vercel.app/products?skip=${skip}&limit=20&search=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(category)}&sort=${encodeURIComponent(sort)}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

// Fetch categories
async function fetchCategories() {
  const res = await fetch('https://next-ecommerce-api.vercel.app/categories'); 
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State initialization
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSortOrder, setSelectedSortOrder] = useState("asc");
  const [page, setPage] = useState(1);

  // Debounced search query update
  const debouncedSetSearchQuery = useDebounce((value) => {
    setSearchQuery(value);
    setPage(1); // Reset to first page when searching
  }, 300);

  // Function to parse URL parameters
  const parseUrlParams = useCallback(() => {
    const urlSearchQuery = searchParams.get("search") || "";
    const urlCategory = searchParams.get("category") || "";
    const urlSortOrder = searchParams.get("sort") || "asc";
    const urlPage = parseInt(searchParams.get("page") || "1");

    setSearchQuery(urlSearchQuery);
    setSelectedCategory(urlCategory);
    setSelectedSortOrder(urlSortOrder);
    setPage(urlPage);

    return { urlSearchQuery, urlCategory, urlSortOrder, urlPage };
  }, [searchParams]);

  // Effect to parse URL parameters on page load
  useEffect(() => {
    const { urlSearchQuery, urlCategory, urlSortOrder, urlPage } = parseUrlParams();
    fetchData(urlPage, urlSearchQuery, urlCategory, urlSortOrder);
  }, [parseUrlParams]);

  // Function to fetch data based on current state
  const fetchData = useCallback(async (currentPage, query, category, sortOrder) => {
    try {
      const [fetchedProducts, fetchedCategories] = await Promise.all([
        fetchProducts(currentPage, query, category, sortOrder),
        fetchCategories(),
      ]);

      // Sorting logic
      const sortedProducts = [...fetchedProducts].sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.price - b.price; // Ascending order
        } else if (sortOrder === 'desc') {
          return b.price - a.price; // Descending order
        }
        return 0;
      });

      setProducts(sortedProducts);
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  }, []);

  // Effect to fetch products when filters change
  useEffect(() => {
    fetchData(page, searchQuery, selectedCategory, selectedSortOrder);
  }, [page, searchQuery, selectedCategory, selectedSortOrder, fetchData]);

  // Function to update URL
  const updateUrl = useCallback(() => {
    const query = {
      page: page.toString(),
      search: searchQuery || undefined,
      category: selectedCategory || undefined,
      sort: selectedSortOrder || undefined,
    };

    const cleanQuery = Object.fromEntries(
      Object.entries(query)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)])
    );

    const pathname = "/products"; // Define the path to navigate to

    router.push({
      pathname: '/products',
      query: cleanQuery,
    }, undefined, { shallow: true });
  }, [page, searchQuery, selectedCategory, selectedSortOrder, router]);

  // Effect to update URL when state changes
  useEffect(() => {
    updateUrl();
  }, [page, searchQuery, selectedCategory, selectedSortOrder, updateUrl]);

  // Handlers for user input
  const handleSearch = (e) => {
    debouncedSetSearchQuery(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setPage(1); // Reset to first page when changing category
  };

  const handleSortOrderSelect = (sortOrder) => {
    setSelectedSortOrder(sortOrder);
    setPage(1); // Reset to first page when sorting
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
                placeholder="Search for products..."
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
              selectedSortOrder={selectedSortOrder}
              onSelectSortOrder={handleSortOrderSelect}
            />

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>

            {/* Pagination Component */}
            <Pagination 
              currentPage={page} 
              searchQuery={searchQuery} 
              selectedCategory={selectedCategory} 
              selectedSortOrder={selectedSortOrder} 
              onPageChange={setPage} // Ensure this prop is passed to handle page changes
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
