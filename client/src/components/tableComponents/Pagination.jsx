import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  indexOfFirstPool,
  indexOfLastPool,
  filteredPools,
}) => {
  const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const endPage = Math.min(startPage + 4, totalPages);
  const pages = [...Array(endPage - startPage + 1).keys()].map(
    (i) => startPage + i
  );

  return (
    <div className="flex justify-between mt-3">
      <div className="flex-start  ">
        <p>
          Showing {indexOfFirstPool + 1} to{" "}
          {Math.min(indexOfLastPool, filteredPools.length)} of{" "}
          {filteredPools.length} entries
        </p>
      </div>
      <div className="flex-end">
        <button
          className={`px-3 py-2 rounded-md mr-2 ${
            currentPage === 1 || totalPages === 0
              ? "bg-gray-200    cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700 active:bg-blue-900"
          }`}
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1 || totalPages === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
        </button>
        <button
          className={`px-3 py-2 rounded-md mr-2 ${
            currentPage === 1 || totalPages === 0
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700 active:bg-blue-900"
          }`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1 || totalPages === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          className={`px-3 py-2 rounded-md mr-2 ${
            currentPage === totalPages || totalPages === 0
              ? "bg-gray-200    cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700 active:bg-blue-900"
          }`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <button
          className={`px-3 py-2 rounded-md ${
            currentPage === totalPages || totalPages === 0
              ? "bg-gray-200   cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700 active:bg-blue-900"
          }`}
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
