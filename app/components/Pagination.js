// components/Pagination.js
import Link from "next/link";

export default function Pagination({ currentPage }) {
  const pageNum = parseInt(currentPage, 10);
  const prevPage = pageNum > 1 ? pageNum - 1 : null;
  const nextPage = pageNum < 11 ? pageNum + 1 : null;

  return (
    <div className="flex justify-between items-center mt-8">
      {prevPage && (
        <Link href={`/?page=${prevPage}`}>
          <button className="px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
            Previous Page
          </button>
        </Link>
      )}
      <span className="text-lg font-bold text-gray-700">Page {pageNum}</span>
      <Link href={`/?page=${nextPage}`}>
        <button className="px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-purple-500 transition-colors duration-300">
          Next Page
        </button>
      </Link>
    </div>
  );
}
