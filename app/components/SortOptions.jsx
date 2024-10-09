// SortOptions.jsx
import React from 'react';

const SortOptions = ({ selectedSort, selectedOrder, onSortChange, onOrderChange }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Sort by Price</h2>
      <div className="flex gap-2">
        <button
          onClick={() => {
            onSortChange('price');  // Update sorting
            onOrderChange('asc');    // Default to ascending order
          }}
          className={`px-4 py-2 border rounded-lg ${selectedSort === 'price' && selectedOrder === 'asc' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} hover:bg-blue-100 focus:outline-none`}
        >
          Price: Low to High
        </button>
        <button
          onClick={() => {
            onSortChange('price');  // Update sorting
            onOrderChange('desc');   // Set to descending order
          }}
          className={`px-4 py-2 border rounded-lg ${selectedSort === 'price' && selectedOrder === 'desc' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} hover:bg-blue-100 focus:outline-none`}
        >
          Price: High to Low
        </button>
        <button
          onClick={() => onSortChange('default')}
          className={`px-4 py-2 border rounded-lg ${selectedSort === 'default' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} hover:bg-blue-100`}
        >
          Default
        </button>
      </div>
    </div>
  );
};

export default SortOptions;
