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

  useEffect(() => {
    fetchPools();
  }, [fetchPools]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="mt-3 text-xl font-bold text-red-500">{error}</div>;
  }

  return (
    <>
      <h1 className="mt-3 text-xl font-bold ">All customer bodies of water</h1>
      <PoolsTable pools={pools} />
    </>
  );
};

export default Index;
