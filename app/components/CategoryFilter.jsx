import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Filter by Category</h2>
      <select
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
        className="px-4 py-2 border rounded-lg bg-white text-blue-500 hover:bg-blue-100"
      >
        <option value="">All Categories</option>
        {categories.length > 0 ? (
          categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))
        ) : (
          <option value="">
            Loading categories...
          </option>
        )}
      </select>
    </div>
  );
};

export default CategoryFilter;
