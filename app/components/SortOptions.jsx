// SortOptions.jsx
import React from 'react';

const SortOptions = ({ selectedSort, selectedOrder, onSelectSortOrder }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Sort by Price</h2>
      <div className="flex gap-2">
        <button
          onClick={() => onSelectSortOrder('price', 'asc')}
          className={`px-4 py-2 border rounded-lg ${selectedOrder === 'asc' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} hover:bg-blue-100 focus:outline-none`}
        >
          Price: Low to High
        </button>
        <button
          onClick={() => onSelectSortOrder('price', 'desc')}
          className={`px-4 py-2 border rounded-lg ${selectedOrder === 'desc' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} hover:bg-blue-100 focus:outline-none`}
        >
          Price: High to Low
        </button>
        <button
          onClick={() => onSelectSortOrder('default', 'asc')}
          className={`px-4 py-2 border rounded-lg ${selectedSort === 'default' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} hover:bg-blue-100`}
        >
          Default
        </button>
      </div>
    </div>
  );
};

export default SortOptions;
