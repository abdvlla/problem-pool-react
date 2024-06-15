import React, { useEffect, useState } from "react";
import axios from "axios";
import PoolsTable from "../../components/PoolsTable";

const Index = () => {
  const [pools, setPools] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("User not authenticated");
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
      } catch (err) {
        console.error("Error fetching pools data:", err);
        setError("Failed to fetch pools data");
      }
    };

    fetchPools();
  }, [token]);

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
