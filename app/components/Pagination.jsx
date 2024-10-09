import Link from "next/link";

export default function Pagination({ currentPage, totalPages, searchQuery, selectedCategory, selectedSortOrder }) {
  const pageNum = parseInt(currentPage, 10);
  const prevPage = pageNum > 1 ? pageNum - 1 : null;
  const nextPage = pageNum < totalPages ? pageNum + 1 : null; // Only allow next page if it exists

  // Helper function to construct URL with current filters
  const buildUrl = (page) => {
    let url = `/?page=${page}`;
    if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
    if (selectedCategory) url += `&category=${encodeURIComponent(selectedCategory)}`;
    if (selectedSortOrder) url += `&sort=${encodeURIComponent(selectedSortOrder)}`;
    return url;
  };

  return (
    <div className="flex justify-between items-center mt-8">
      {prevPage && (
        <Link href={buildUrl(prevPage)}>
          <button className="px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
            Previous Page
          </button>
        </Link>
      )}
      <span className="text-lg font-bold text-gray-700">Page {pageNum} of {totalPages}</span>
      {nextPage && (
        <Link href={buildUrl(nextPage)}>
          <button className="px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-purple-500 transition-colors duration-300">
            Next Page
          </button>
        </Link>
      )}
    </div>
  );
}
