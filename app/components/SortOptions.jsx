import React from 'react';

const SortOptions = ({ selectedSortOrder, onSelectSortOrder }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Sort by Price</h2>
      <div className="flex gap-2">
        <button
          onClick={() => onSelectSortOrder('asc')}
          className={`px-4 py-2 border rounded-lg ${selectedSortOrder === 'asc' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} hover:bg-blue-100`}
        >
          Price: Low to High
        </button>
        <button
          onClick={() => onSelectSortOrder('desc')}
          className={`px-4 py-2 border rounded-lg ${selectedSortOrder === 'desc' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} hover:bg-blue-100`}
        >
          Price: High to Low
        </button>
        <button
          onClick={() => onSelectSortOrder('default')}
          className={`px-4 py-2 border rounded-lg ${selectedSortOrder === 'default' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} hover:bg-blue-100`}
        >
          Default
        </button>
      </div>
    </div>
  );
};

export default SortOptions;
