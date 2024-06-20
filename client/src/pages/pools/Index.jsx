import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import PoolsTable from "../../components/PoolsTable";

const Index = () => {
  const token = localStorage.getItem("token");
  const [pools, setPools] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPools = useCallback(async () => {
    if (!token) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/customers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPools(response.data.data);
    } catch (err) {
      console.error("Error fetching pools data:", err);
      setError("Failed to fetch pools data");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleBulkUpdate = async (
    selectedPools,
    bulkAssignedTo,
    bulkTodaysList
  ) => {
    if (!token) {
      setError("User not authenticated");
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/customers/bulk-update`,
        {
          ids: selectedPools,
          assignedTo: bulkAssignedTo || undefined,
          todaysList: bulkTodaysList || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchPools(); // Refresh the pools data after the update
    } catch (err) {
      console.error("Failed to update pools", err);
      setError("Failed to update pools");
    }
  };

  useEffect(() => {
    fetchPools();
  }, [fetchPools]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
        <p className="dark:text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="mt-3 text-xl font-bold text-red-500">{error}</div>;
  }

  return (
    <>
      <h1 className="mt-3 text-xl font-bold dark:text-white">
        All bodies of water
      </h1>
      <PoolsTable pools={pools} onBulkUpdate={handleBulkUpdate} />
    </>
  );
};

export default Index;
