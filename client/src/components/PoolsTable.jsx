import React, { useState, useMemo, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import Filters from "./tableComponents/Filters";
import BulkOptions from "./tableComponents/BulkOptions";
import TableHeader from "./tableComponents/TableHeader";
import TableBody from "./tableComponents/TableBody";
import Pagination from "./tableComponents/Pagination";

const PoolsTable = ({ pools, onBulkUpdate, staff }) => {
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
    <div className="content-center py-7 px-4 mx-auto w-10/12 relative overflow-x-auto sm:rounded-lg border rounded-lg shadow   mt-4 ">
      <Filters
        entriesPerPage={entriesPerPage}
        onEntriesChange={handleEntriesChange}
        statusFilter={statusFilter}
        staffFilter={staffFilter}
        todaysListFilter={todaysListFilter}
        searchQuery={searchQuery}
        staff={staff}
        onStatusFilterChange={handleStatusFilterChange}
        onStaffFilterChange={handleStaffFilterChange}
        onTodaysListFilterChange={handleTodaysListFilterChange}
        onSearchChange={handleSearchChange}
        onClearFilters={clearFilters}
        onClearSearch={clearSearch}
      />
      {showBulkOptions && (
        <BulkOptions
          staff={staff}
          bulkStatus={bulkStatus}
          bulkAssignedTo={bulkAssignedTo}
          bulkTodaysList={bulkTodaysList}
          bulkPriority={bulkPriority}
          onStatusChange={(e) => setBulkStatus(e.target.value)}
          onAssignedToChange={(e) => setBulkAssignedTo(e.target.value)}
          onTodaysListChange={(e) => setBulkTodaysList(e.target.value)}
          onPriorityChange={(e) => setBulkPriority(e.target.value)}
          onBulkUpdate={handleBulkUpdate}
        />
      )}
      <table id="poolTable" className="table-sm bg-base-100 table-auto w-full">
        <TableHeader
          showBulkOptions={showBulkOptions}
          sortConfig={sortConfig}
          handleSort={handleSort}
          setSelectedPools={setSelectedPools}
          currentPools={currentPools}
          selectedPools={selectedPools}
          setShowBulkOptions={setShowBulkOptions}
        />
        <TableBody
          currentPools={currentPools}
          indexOfFirstPool={indexOfFirstPool}
          showBulkOptions={showBulkOptions}
          selectedPools={selectedPools}
          handleCheckboxChange={handleCheckboxChange}
        />
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        indexOfFirstPool={indexOfFirstPool}
        indexOfLastPool={indexOfLastPool}
        filteredPools={filteredPools}
      />
    </div>
  );
};

export default PoolsTable;
