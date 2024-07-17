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
  <thead className="text-xs bg-base-300">
    <tr>
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
      <th className=" font-semibold ">#</th>
      <th className="font-semibold ">First name</th>
      <th className=" font-semibold ">Last name</th>
      <th className=" font-semibold  hidden md:table-cell">Email</th>
      <th className=" font-semibold  hidden md:table-cell">Phone</th>
      <th className=" font-semibold  hidden md:table-cell">Street</th>
      <th className=" font-semibold  hidden md:table-cell">Town</th>
      <th className=" font-semibold ">Status</th>
      <th className=" font-semibold ">Assigned to</th>
      <th className=" font-semibold  hidden md:table-cell">Today's list</th>
      <th
        className=" font-semibold  cursor-pointer hidden md:table-cell"
        onClick={() => handleSort("priority")}
      >
        Priority{" "}
        {sortConfig.key === "priority"
          ? sortConfig.direction === "ascending"
            ? "↑"
            : "↓"
          : ""}
      </th>
      <th className=" font-semibold  hidden md:table-cell">CD</th>
      <th
        className=" font-semibold  cursor-pointer hidden md:table-cell"
        onClick={() => handleSort("updatedAt")}
      >
        Last updated{" "}
        {sortConfig.key === "updatedAt"
          ? sortConfig.direction === "ascending"
            ? "↑"
            : "↓"
          : ""}
      </th>
      <th className="font-semibold ">
        <button
          onClick={() => setShowBulkOptions(!showBulkOptions)}
          className="items-center justify-center px-2 py-2  rounded-full shadow-md  focus:ring ring-blue-600"
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
