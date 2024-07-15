import React from "react";

const Filters = ({
  entriesPerPage,
  onEntriesChange,
  statusFilter,
  staffFilter,
  todaysListFilter,
  searchQuery,
  staff,
  onStatusFilterChange,
  onStaffFilterChange,
  onTodaysListFilterChange,
  onSearchChange,
  onClearFilters,
  onClearSearch,
}) => (
  <div className="flex mb-4 space-y-4 sm:space-y-0">
    <div className="justify-start ">
      <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
        Entries per page
      </label>
      <select
        className="relative w-full cursor-default rounded-md bg-white dark:bg-neutral-800 dark:text-gray-100 py-1.5 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        id="page-length"
        aria-labelledby="page-length-label"
        onChange={onEntriesChange}
        value={entriesPerPage}
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>

    <div className="mx-auto flex flex-row items-center space-x-4 ">
      <div className=" ">
        <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
          Filter by status
        </label>
        <select
          className="relative w-full cursor-default rounded-md bg-white dark:bg-neutral-800 dark:text-gray-100 py-1.5 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
          id="status-filter"
          name="status"
          aria-labelledby="status-filter-label"
          onChange={onStatusFilterChange}
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

      <div className=" ">
        <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
          Filter by staff
        </label>
        <select
          className="relative w-full cursor-default rounded-md bg-white dark:bg-neutral-800 dark:text-gray-100 py-1.5 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
          id="staff-filter"
          name="staff"
          aria-labelledby="staff-filter-label"
          onChange={onStaffFilterChange}
          value={staffFilter}
        >
          <option value="">All</option>
          {staff.map((member) => (
            <option key={member._id} value={member.name}>
              {member.name}
            </option>
          ))}
        </select>
      </div>

      <div className=" ">
        <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
          Filter today's list
        </label>
        <select
          className="relative w-full cursor-default rounded-md bg-white dark:bg-neutral-800 dark:text-gray-100 py-1.5 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
          id="todaysList-filter"
          name="todaysList"
          aria-labelledby="todaysList-filter-label"
          value={todaysListFilter}
          onChange={onTodaysListFilterChange}
        >
          <option value="">All</option>
          <option value="yes">Yes</option>
          <option value="done">Done</option>
        </select>
      </div>
      <button
        onClick={onClearFilters}
        className="mt-9 text-blue-500 font-semibold underline hover:text-blue-600 active:text-blue-800"
      >
        Clear
      </button>
    </div>

    <div className="flex flex-col  w-full md:w-auto">
      <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 px-2">
        Search records
      </label>
      <div className="relative mt-1">
        <input
          type="text"
          className="block w-full p-2 text-sm text-gray-900 dark:bg-neutral-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search..."
          onChange={onSearchChange}
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
            <button onClick={onClearSearch}>
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
);

export default Filters;
