import React from "react";
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
      <tr key={pool._id} className=" border-b border-gray-500  text-sm">
        <td className="py-3">
          {showBulkOptions && (
            <input
              type="checkbox"
              checked={selectedPools.includes(pool._id)}
              onChange={(e) => handleCheckboxChange(e, pool._id)}
            />
          )}
        </td>
        <td className="py-3  select-all">{indexOfFirstPool + index + 1}.</td>
        <td className="py-3  select-all">{pool.firstName}</td>
        <td className="py-3  font-bold select-all">{pool.lastName}</td>
        <td className="py-3 text-blue-600 dark:text-blue-400 underline hidden md:table-cell">
          <button
            className="underline"
            onClick={() => (window.location = `mailto:${pool.email}`)}
          >
            {pool.email}
          </button>
        </td>
        <td className="py-3 select-all  hidden md:table-cell">{pool.number}</td>
        <td className="py-3  hidden md:table-cell">{pool.street}</td>
        <td className="py-3  hidden md:table-cell">{pool.town}</td>
        <td className="py-3 ">{pool.status}</td>
        <td className="py-3 ">
          {pool.assignedTo === "Hannah" ? (
            <span className="text-pink-500">{pool.assignedTo}</span>
          ) : (
            <span>{pool.assignedTo}</span>
          )}
        </td>
        <td className="py-3 hidden md:table-cell">
          <div className="space-x-2  font-bold">
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
        <td className="py-3  hidden md:table-cell">{pool.priority}</td>
        <td className="py-3 hidden md:table-cell">
          {pool.chlorineDemand && <span>&#10003;</span>}
        </td>
        <td className="py-3  hidden md:table-cell">
          {new Date(pool.updatedAt).toLocaleDateString()}
        </td>
        <td className="py-3 ">
          <OptionsDropdown poolId={pool._id} />
        </td>
      </tr>
    ))}
  </tbody>
);

export default TableBody;
