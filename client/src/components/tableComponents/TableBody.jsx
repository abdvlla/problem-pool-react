import React from "react";
import { Link } from "react-router-dom";
import OptionsDropdown from "./OptionsDropdown";

const TableBody = ({
  currentPools,
  indexOfFirstPool,
  showBulkOptions,
  selectedPools,
  handleCheckboxChange,
}) => (
  <tbody>
    {currentPools.map((pool, index) => (
      <tr
        key={pool._id}
        className="bg-white dark:bg-neutral-800 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-neutral-700 text-sm"
      >
        <td className="py-3">
          {showBulkOptions && (
            <input
              type="checkbox"
              checked={selectedPools.includes(pool._id)}
              onChange={(e) => handleCheckboxChange(e, pool._id)}
            />
          )}
        </td>
        <td className="py-3 text-gray-900 dark:text-gray-100 select-all">
          {indexOfFirstPool + index + 1}.
        </td>
        <td className="py-3 text-gray-900 dark:text-gray-100 select-all">
          {pool.firstName}
        </td>
        <td className="py-3 text-gray-900 dark:text-gray-100 font-bold select-all">
          {pool.lastName}
        </td>
        <td className="py-3 text-blue-600 dark:text-blue-400 underline hidden md:table-cell">
          <button
            className="underline"
            onClick={() => (window.location = `mailto:${pool.email}`)}
          >
            {pool.email}
          </button>
        </td>
        <td className="py-3 select-all text-gray-900 dark:text-gray-100 hidden md:table-cell">
          {pool.number}
        </td>
        <td className="py-3 text-gray-900 dark:text-gray-100 hidden md:table-cell">
          {pool.street}
        </td>
        <td className="py-3 text-gray-900 dark:text-gray-100 hidden md:table-cell">
          {pool.town}
        </td>
        <td className="py-3 text-gray-900 dark:text-gray-100">{pool.status}</td>
        <td className="py-3 text-gray-900 dark:text-gray-100">
          {pool.assignedTo === "Hannah" ? (
            <span className="text-pink-500">{pool.assignedTo}</span>
          ) : (
            <span>{pool.assignedTo}</span>
          )}
        </td>
        <td className="py-3 hidden md:table-cell">
          <div className="space-x-2 dark:text-gray-100 font-bold">
            {pool.todaysList === "Yes" && (
              <span className="inline-block px-2  text-sm font-semibold text-yellow-900 bg-yellow-300 rounded-full">
                Yes
              </span>
            )}
            {pool.todaysList === "Done" && (
              <span className="inline-block px-2  text-sm font-semibold text-green-900 bg-green-300 rounded-full">
                Done
              </span>
            )}
          </div>
        </td>
        <td className="py-3 text-gray-900 dark:text-gray-100 hidden md:table-cell">
          {pool.priority}
        </td>
        <td className="py-3 text-gray-900 dark:text-gray-100 hidden md:table-cell">
          {new Date(pool.updatedAt).toLocaleDateString()}
        </td>
        <td className="py-3 dark:text-white">
          <OptionsDropdown poolId={pool._id} />
        </td>
      </tr>
    ))}
  </tbody>
);

export default TableBody;
