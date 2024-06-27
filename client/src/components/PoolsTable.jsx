import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const PoolsTable = ({ pools, onBulkUpdate }) => {
  const [entriesPerPage, setEntriesPerPage] = useState(
    () => parseInt(localStorage.getItem("entriesPerPage")) || 10
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState(
    localStorage.getItem("statusFilter") || ""
  );
  const [staffFilter, setStaffFilter] = useState(
    localStorage.getItem("staffFilter") || ""
  );
  const [todaysListFilter, setTodaysListFilter] = useState(
    localStorage.getItem("todaysListFilter") || ""
  );
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchQuery") || ""
  );
  const [sortConfig, setSortConfig] = useState({
    key: "updatedAt",
    direction: "descending",
  });
  const [selectedPools, setSelectedPools] = useState([]);
  const [bulkAssignedTo, setBulkAssignedTo] = useState("");
  const [bulkTodaysList, setBulkTodaysList] = useState("");
  const [bulkStatus, setBulkStatus] = useState("");
  const [bulkPriority, setBulkPriority] = useState("");
  const [showBulkOptions, setShowBulkOptions] = useState(false);

  useEffect(() => {
    localStorage.setItem("entriesPerPage", entriesPerPage);
    localStorage.setItem("statusFilter", statusFilter);
    localStorage.setItem("staffFilter", staffFilter);
    localStorage.setItem("todaysListFilter", todaysListFilter);
    localStorage.setItem("searchQuery", searchQuery);
  }, [
    entriesPerPage,
    statusFilter,
    staffFilter,
    todaysListFilter,
    searchQuery,
  ]);

  const handleSort = useCallback((key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction:
            prev.direction === "ascending" ? "descending" : "ascending",
        };
      } else {
        return {
          key,
          direction: "ascending",
        };
      }
    });
  }, []);

  const sortedPools = useMemo(() => {
    return [...pools].sort((a, b) => {
      const aDate = new Date(a.updatedAt).getTime();
      const bDate = new Date(b.updatedAt).getTime();
      const aValidDate = !isNaN(aDate);
      const bValidDate = !isNaN(bDate);

      if (sortConfig.key === "priority") {
        if (a.priority && !b.priority) return -1;
        if (!a.priority && b.priority) return 1;
        if (a.priority && b.priority) {
          return sortConfig.direction === "ascending"
            ? a.priority - b.priority
            : b.priority - a.priority;
        }
      }

      if (sortConfig.key === "updatedAt") {
        if (aValidDate && !bValidDate) return -1;
        if (!aValidDate && bValidDate) return 1;
        if (aValidDate && bValidDate) {
          return sortConfig.direction === "ascending"
            ? aDate - bDate
            : bDate - aDate;
        }
      }

      return 0;
    });
  }, [pools, sortConfig]);

  const filteredPools = useMemo(() => {
    return sortedPools.filter((pool) => {
      const query = searchQuery.toLowerCase();
      const keywords = query.split(" ");

      return (
        (!statusFilter ||
          pool.status?.toLowerCase().includes(statusFilter.toLowerCase())) &&
        (!staffFilter ||
          pool.assignedTo?.toLowerCase().includes(staffFilter.toLowerCase())) &&
        (!todaysListFilter ||
          pool.todaysList
            ?.toLowerCase()
            .includes(todaysListFilter.toLowerCase())) &&
        keywords.every((keyword) => {
          return (
            pool.firstName?.toLowerCase().includes(keyword) ||
            pool.lastName?.toLowerCase().includes(keyword) ||
            pool.email?.toLowerCase().includes(keyword) ||
            pool.street?.toLowerCase().includes(keyword) ||
            pool.town?.toLowerCase().includes(keyword) ||
            pool.number?.toLowerCase().startsWith(keyword)
          );
        })
      );
    });
  }, [statusFilter, staffFilter, todaysListFilter, searchQuery, sortedPools]);

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

  const handleTodaysListFilterChange = (e) => {
    setTodaysListFilter(e.target.value);
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

  const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const endPage = Math.min(startPage + 4, totalPages);

  const pages = [...Array(endPage - startPage + 1).keys()].map(
    (i) => startPage + i
  );

  const clearFilters = () => {
    setStatusFilter("");
    setStaffFilter("");
    setTodaysListFilter("");
    setSearchQuery("");
    setBulkAssignedTo("");
    setBulkPriority("");
    setBulkStatus("");
    setBulkTodaysList("");
    localStorage.removeItem("statusFilter");
    localStorage.removeItem("staffFilter");
    localStorage.removeItem("todaysListFilter");
    localStorage.removeItem("searchQuery");
  };

  const clearSearch = () => {
    setSearchQuery("");
    localStorage.removeItem("searchQuery");
  };

  const handleCheckboxChange = (e, poolId) => {
    if (e.target.checked) {
      setSelectedPools((prevSelected) => [...prevSelected, poolId]);
    } else {
      setSelectedPools((prevSelected) =>
        prevSelected.filter((id) => id !== poolId)
      );
    }
  };

  const handleBulkUpdate = async () => {
    if (selectedPools.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "No bodies of water selected. Please select bodies of water to update.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }

    await onBulkUpdate(
      selectedPools,
      bulkAssignedTo,
      bulkTodaysList,
      bulkStatus,
      bulkPriority
    );
    setSelectedPools([]);
  };

  return (
    <div className="content-center py-6 px-5 mx-auto max-w-screen-xl relative overflow-x-auto sm:rounded-lg border rounded-lg shadow bg-gray-50 dark:bg-neutral-900 mt-4 ">
      <div className="flex justify-between mb-4">
        <div className="justify-start">
          <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 px-2 ">
            Entries per page
          </label>
          <div className="relative mt-2">
            <select
              className="relative w-full cursor-default rounded-md bg-white dark:bg-neutral-800 dark:text-gray-100 py-1.5 pl-3  text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
              id="page-length"
              aria-labelledby="page-length-label"
              onChange={handleEntriesChange}
              value={entriesPerPage}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>

        <div className="mx-auto flex flex-row items-center space-x-4 ">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 ">
              Filter by status
            </label>
            <div className="relative mt-2">
              <select
                className="relative w-full cursor-default rounded-md bg-white dark:bg-neutral-800 dark:text-gray-100 py-1.5 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                id="status-filter"
                name="status"
                aria-labelledby="status-filter-label"
                onChange={handleStatusFilterChange}
                value={statusFilter}
              >
                <option value="">All</option>
                <option value="New BoW">New BoW</option>
                <option value="Weekly service">Weekly service</option>
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
            <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 ">
              Filter by staff
            </label>
            <div className="relative mt-2">
              <select
                className="relative w-full cursor-default rounded-md bg-white dark:bg-neutral-800 dark:text-gray-100 py-1.5 pl-3  text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                id="staff-filter"
                name="staff"
                aria-labelledby="staff-filter-label"
                onChange={handleStaffFilterChange}
                value={staffFilter}
              >
                <option value="">All</option>
                <option value="Jenn">Jenn</option>
                <option className="text-blue-600" value="Colby">
                  Colby
                </option>
                <option className="text-blue-500" value="Ben">
                  Ben
                </option>
                <option className="text-pink-500" value="Hannah">
                  Hannah
                </option>
                <option value="Amaya">Amaya</option>
                <option className="text-orange-500" value="Jack">
                  Jack
                </option>
                <option className="text-pink-400" value="Jaime">
                  Jaime
                </option>
                <option value="Mark">Mark</option>
                <option value="Service">Service</option>
                <option value="Construction">Construction</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 ">
              Filter today's list
            </label>
            <div className="relative mt-2">
              <select
                className="relative w-full cursor-default rounded-md bg-white dark:bg-neutral-800 dark:text-gray-100 py-1.5 pl-3  text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                id="todaysList-filter"
                name="todaysList"
                aria-labelledby="todaysList-filter-label"
                value={todaysListFilter}
                onChange={handleTodaysListFilterChange}
              >
                <option value="">All</option>
                <option value="yes">Yes</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="flex items-center justify-center mt-9 text-blue-500 font-semibold underline hover:text-blue-600 active:text-blue-800"
          >
            Clear
          </button>
        </div>
        <div className="justify-end">
          <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 px-2 ">
            Search records
          </label>
          <div className="relative mt-1">
            <input
              type="text"
              className="block w-full p-2 text-sm text-gray-900 dark:bg-neutral-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
              onChange={handleSearchChange}
              value={searchQuery}
            />

            {searchQuery === "" ? (
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
            ) : (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-800 dark:text-gray-200">
                <button onClick={clearSearch}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showBulkOptions && (
        <div className="flex justify-center items-center space-x-4 mb-4 mr-2">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                Update status
              </label>
              <select
                className="relative w-full cursor-default rounded-md bg-white dark:bg-neutral-800 dark:text-gray-100 py-1.5 pl-3  text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                value={bulkStatus}
                onChange={(e) => setBulkStatus(e.target.value)}
              >
                <option value=""></option>
                <option value=" ">None</option>
                <option value="New BoW">New BoW</option>
                <option value="Received">Received</option>
                <option value="Weekly service">Weekly service</option>
                <option value="Follow-up 1">Follow-up 1</option>
                <option value="Follow-up 2">Follow-up 2</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Improving">Improving</option>
                <option value="No update">No update</option>
                <option value="Almost">Almost</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                Assign to staff
              </label>
              <select
                className="relative w-full cursor-default rounded-md bg-white dark:bg-neutral-800 dark:text-gray-100 py-1.5 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                value={bulkAssignedTo}
                onChange={(e) => setBulkAssignedTo(e.target.value)}
              >
                <option value=""></option>
                <option value=" ">None</option>
                <option value="Jenn">Jenn</option>
                <option className="text-blue-600" value="Colby">
                  Colby
                </option>
                <option className="text-blue-500" value="Ben">
                  Ben
                </option>
                <option className="text-pink-500" value="Hannah">
                  Hannah
                </option>
                <option value="Amaya">Amaya</option>
                <option className="text-orange-500" value="Jack">
                  Jack
                </option>
                <option value="Jaime">Jaime</option>
                <option value="Mark">Mark</option>
                <option value="Service">Service</option>
                <option value="Construction">Construction</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                Update today's list
              </label>
              <select
                className="relative w-full cursor-default rounded-md bg-white dark:bg-neutral-800 dark:text-gray-100 py-1.5 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                value={bulkTodaysList}
                onChange={(e) => setBulkTodaysList(e.target.value)}
              >
                <option value=""></option>
                <option value=" ">None</option>
                <option value="Yes">Yes</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                Update priority
              </label>
              <select
                className="relative w-full cursor-default rounded-md bg-white dark:bg-neutral-800 dark:text-gray-100 py-1.5 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                value={bulkPriority}
                onChange={(e) => setBulkPriority(e.target.value)}
              >
                <option value=""></option>
                <option value=" ">None</option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleBulkUpdate}
              className="px-2 py-2 bg-blue-500 text-white rounded-lg text-sm mt-5 hover:bg-blue-700 active:bg-blue-900"
            >
              Update
            </button>
          </div>
        </div>
      )}
      <table id="poolTable" className="table-auto shadow-lg rounded w-full">
        <thead className="bg-gray-200 dark:bg-neutral-600">
          <tr className="text-sm">
            <th>
              {showBulkOptions && (
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedPools(
                      e.target.checked
                        ? currentPools.map((pool) => pool._id)
                        : []
                    )
                  }
                  checked={selectedPools.length === currentPools.length}
                />
              )}
            </th>
            <th className=" font-semibold text-gray-800 dark:text-gray-100">
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
            <th className="py-3 font-semibold text-gray-800 dark:text-gray-100">
              Today's list
            </th>
            <th
              className="py-3 font-semibold text-gray-800 dark:text-gray-100 cursor-pointer"
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
            <th className=" font-semibold text-gray-800 dark:text-gray-100">
              <button
                onClick={() => setShowBulkOptions(!showBulkOptions)}
                className=" ml-4flex items-center justify-center px-2 py-2 text-gray-100 bg-gray-700 rounded-full shadow-md hover:bg-gray-900  dark:text-gray-900 dark:bg-gray-200 dark:hover:bg-gray-100 focus:ring ring-blue-600"
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
        <tbody>
          {currentPools.map((pool) => (
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
              <td className="py-3 text-gray-900 dark:text-gray-100">
                {pool.status}
              </td>
              <td className="py-3 text-gray-900 dark:text-gray-100">
                {pool.assignedTo === "Hannah" ? (
                  <span className="text-pink-500">{pool.assignedTo}</span>
                ) : (
                  <span>{pool.assignedTo}</span>
                )}
              </td>
              <td className="py-3">
                <div className="space-x-2 dark:text-gray-100 font-bold">
                  {pool.todaysList === "Yes" && (
                    <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full"></span>
                  )}
                  {pool.todaysList === "Done" && (
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                  )}
                  <span>{pool.todaysList}</span>
                </div>
              </td>
              <td className="py-3 text-gray-900 dark:text-gray-100">
                {pool.priority}
              </td>
              <td className="py-3 text-gray-900 dark:text-gray-100 hidden md:table-cell">
                {new Date(pool.updatedAt).toLocaleDateString()}
              </td>
              <td className="py-3 dark:text-white">
                <Link
                  to={`/pools/${pool._id}`}
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View
                </Link>
                /
                <Link
                  to={`/pools/${pool._id}/edit`}
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-3">
        <div className="flex-start text-gray-900 dark:text-gray-100">
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
                ? "bg-gray-200 dark:bg-neutral-700 text-gray-900 dark:text-gray-100 cursor-not-allowed"
                : "bg-blue-500 text-white"
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
                ? "bg-gray-200 dark:bg-neutral-700 text-gray-900 dark:text-gray-100 cursor-not-allowed"
                : "bg-blue-500 text-white"
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
                ? "bg-gray-200 dark:bg-neutral-700 text-gray-900 dark:text-gray-100 cursor-not-allowed"
                : "bg-blue-500 text-white"
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
                ? "bg-gray-200 dark:bg-neutral-700 text-gray-900 dark:text-gray-100 cursor-not-allowed"
                : "bg-blue-500 text-white"
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
    </div>
  );
};

export default PoolsTable;
