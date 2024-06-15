import React, { useEffect, useState } from "react";
import axios from "axios";
import PoolsTable from "../../components/PoolsTable";

const Index = () => {
  const [pools, setPools] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    const fetchPools = async () => {
      try {
        const response = await axios.get("http://localhost:5000/pools", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPools(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching pools data:", err);
        setError("Failed to fetch pools data");
        setLoading(false);
      }
    };

    fetchPools();
  }, [token]);

  if (error) {
    return <div className="mt-3 text-xl font-bold text-red-500">{error}</div>;
  }

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
      <h1 className="mt-3 text-xl font-bold">All customer bodies of water</h1>
      <PoolsTable pools={pools} />
    </>
  );
};

export default Index;
