// CategoryFilter.jsx
import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Filter by Category</h2>
      <select
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)} // Call the function passed from the parent
        className="px-4 py-2 border rounded-lg bg-white text-blue-500 hover:bg-blue-100"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
