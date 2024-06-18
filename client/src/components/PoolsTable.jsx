import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

const PoolsTable = ({ pools }) => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [staffFilter, setStaffFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPools = useMemo(() => {
    let filteredData = pools;

    if (statusFilter) {
      filteredData = filteredData.filter((pool) =>
        pool.status.toLowerCase().includes(statusFilter.toLowerCase())
      );
    }

    if (staffFilter) {
      filteredData = filteredData.filter(
        (pool) =>
          pool.assignedTo &&
          pool.assignedTo.toLowerCase().includes(staffFilter.toLowerCase())
      );
    }

    if (searchQuery) {
      const keywords = searchQuery.toLowerCase().split(" ");
      filteredData = filteredData.filter((pool) =>
        keywords.every(
          (keyword) =>
            pool.firstName.toLowerCase().includes(keyword) ||
            pool.lastName.toLowerCase().includes(keyword) ||
            pool.email.toLowerCase().includes(keyword) ||
            pool.number.includes(keyword)
        )
      );
    }

    return filteredData;
  }, [statusFilter, staffFilter, searchQuery, pools]);

  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleStaffFilterChange = (e) => {
    setStaffFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const indexOfLastPool = currentPage * entriesPerPage;
  const indexOfFirstPool = indexOfLastPool - entriesPerPage;
  const currentPools = filteredPools.slice(indexOfFirstPool, indexOfLastPool);

  const totalPages = Math.ceil(filteredPools.length / entriesPerPage);

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(startPage + 4, totalPages);

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  const pages = [...Array(endPage - startPage + 1).keys()].map(
    (i) => startPage + i
  );

  return (
    <div className="content-center py-6 px-5 mx-auto max-w-screen-xl relative overflow-x-auto sm:rounded-lg border rounded-lg shadow bg-gray-50 mt-4">
      <div className="flex justify-between mb-4">
        <div className="justify-start">
          <label className="block text-sm font-medium leading-6 text-gray-900 px-2">
            Entries per page
          </label>
          <div className="relative mt-2">
            <select
              className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
              id="page-length"
              aria-labelledby="page-length-label"
              onChange={handleEntriesChange}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
        <div className="mx-auto flex flex-row items-center space-x-4">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Filter by status
            </label>
            <div className="relative mt-2">
              <select
                className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                id="status-filter"
                name="status"
                aria-labelledby="status-filter-label"
                onChange={handleStatusFilterChange}
              >
                <option value="">All</option>
                <option value="New BoW">New BoW</option>
                <option value="Received">Received</option>
                <option value="Follow-up 1">Follow-up 1</option>
                <option value="Follow-up 2">Follow-up 2</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Improving">Improving</option>
                <option value="No update">No update</option>
                <option value="Almost">Almost</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Filter by staff
            </label>
            <div className="relative mt-2">
              <select
                className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                id="staff-filter"
                name="staff"
                aria-labelledby="staff-filter-label"
                onChange={handleStaffFilterChange}
              >
                <option value="">All</option>
                <option value="Jenn">Jenn</option>
                <option value="Colby">Colby</option>
                <option value="Ben">Ben</option>
                <option value="Hannah">Hannah</option>
                <option value="Amaya">Amaya</option>
                <option value="Jack">Jack</option>
                <option value="Jaime">Jaime</option>
              </select>
            </div>
          </div>
        </div>
        <div className="justify-end">
          <label className="block text-sm font-medium leading-6 text-gray-900 px-2">
            Search records
          </label>
          <div className="relative mt-1">
            <input
              type="text"
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 1 0-4 4m0 0a7 7 0 0 0 4-4z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <table id="poolTable" className="table-auto shadow-lg rounded w-full">
        <thead className="bg-gray-200">
          <tr className="text-sm">
            <th className=" font-semibold text-gray-800 dark:text-white">
              First name
            </th>
            <th className="py-3 font-semibold text-gray-800 dark:text-white">
              Last name
            </th>
            <th className="py-3 font-semibold text-gray-800 dark:text-white">
              Email
            </th>
            <th className="py-3 font-semibold text-gray-800 dark:text-white">
              Phone
            </th>
            <th className="py-3 font-semibold text-gray-800 dark:text-white">
              Status
            </th>
            <th className="py-3 font-semibold text-gray-800 dark:text-white">
              Assigned to
            </th>
            <th className="text-right font-semibold text-gray-800 dark:text-white"></th>
          </tr>
        </thead>
        <tbody>
          {currentPools.map((pool) => (
            <tr
              key={pool._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
            >
              <td className="py-3 text-gray-900 dark:text-white select-all">
                {pool.firstName}
              </td>
              <td className="py-3 text-gray-900 dark:text-white font-bold select-all">
                {pool.lastName}
              </td>
              <td className="py-3 text-blue-600 underline">{pool.email}</td>
              <td className="py-3 select-all">{pool.number}</td>
              <td className="py-3"> {pool.status} </td>
              <td className="py-3"> {pool.assignedTo} </td>
              <td className="py-3">
                <Link
                  to={`/pools/${pool._id}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  View
                </Link>
                /
                <Link
                  to={`/pools/${pool._id}/edit`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-3">
        <div className="flex-start">
          <p>
            Showing {indexOfFirstPool + 1} to{" "}
            {Math.min(indexOfLastPool, filteredPools.length)} of{" "}
            {filteredPools.length} entries
          </p>
        </div>
        <div className="flex-end">
          <button
            className={`px-4 py-2 rounded-md mr-2 ${
              currentPage === 1
                ? "bg-gray-200 text-gray-900 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pages.map((page) => (
            <button
              key={page}
              className={`px-3 py-2 rounded-md mr-2 ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className={`px-3 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-900 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoolsTable;
