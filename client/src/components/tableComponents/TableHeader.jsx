import React from "react";

const TableHeader = ({
  showBulkOptions,
  sortConfig,
  handleSort,
  setSelectedPools,
  currentPools,
  selectedPools,
  setShowBulkOptions,
}) => (
  <thead className="bg-gray-300 dark:bg-neutral-700">
    <tr className="text-sm text-gray-900 dark:text-gray-100">
      <th>
        {showBulkOptions && (
          <input
            type="checkbox"
            onChange={(e) =>
              setSelectedPools(
                e.target.checked ? currentPools.map((pool) => pool._id) : []
              )
            }
            checked={selectedPools.length === currentPools.length}
          />
        )}
      </th>
      <th className="py-3 font-semibold text-gray-800 dark:text-gray-100">#</th>
      <th className="font-semibold text-gray-800 dark:text-gray-100">
        First name
      </th>
      <th className="py-3 font-semibold text-gray-800 dark:text-gray-100">
        Last name
      </th>
      <th className="py-3 font-semibold text-gray-800 dark:text-gray-100 hidden md:table-cell">
        Email
      </th>
      <th className="py-3 font-semibold text-gray-800 dark:text-gray-100 hidden md:table-cell">
        Phone
      </th>
      <th className="py-3 font-semibold text-gray-800 dark:text-gray-100 hidden md:table-cell">
        Street
      </th>
      <th className="py-3 font-semibold text-gray-800 dark:text-gray-100 hidden md:table-cell">
        Town
      </th>
      <th className="py-3 font-semibold text-gray-800 dark:text-gray-100">
        Status
      </th>
      <th className="py-3 font-semibold text-gray-800 dark:text-gray-100">
        Assigned to
      </th>
      <th className="py-3 font-semibold text-gray-800 dark:text-gray-100 hidden md:table-cell">
        Today's list
      </th>
      <th
        className="py-3 font-semibold text-gray-800 dark:text-gray-100 cursor-pointer hidden md:table-cell"
        onClick={() => handleSort("priority")}
      >
        Priority (1-10){" "}
        {sortConfig.key === "priority"
          ? sortConfig.direction === "ascending"
            ? "↑"
            : "↓"
          : ""}
      </th>
      <th
        className="py-3 font-semibold text-gray-800 dark:text-gray-100 cursor-pointer hidden md:table-cell"
        onClick={() => handleSort("updatedAt")}
      >
        Last updated{" "}
        {sortConfig.key === "updatedAt"
          ? sortConfig.direction === "ascending"
            ? "↑"
            : "↓"
          : ""}
      </th>
      <th className="font-semibold text-gray-800 dark:text-gray-100">
        <button
          onClick={() => setShowBulkOptions(!showBulkOptions)}
          className="items-center justify-center px-2 py-2 text-gray-100 bg-gray-700 rounded-full shadow-md hover:bg-gray-900 dark:text-gray-900 dark:bg-gray-200 dark:hover:bg-gray-100 focus:ring ring-blue-600"
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
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
      </th>
    </tr>
  </thead>
);

export default TableHeader;
