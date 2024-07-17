import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import PoolsTable from "../../components/PoolsTable";
import Swal from "sweetalert2";
import { GiBoatFishing } from "react-icons/gi";
import { SlArrowUp } from "react-icons/sl";

const Index = () => {
  const token = localStorage.getItem("token");
  const [pools, setPools] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [unseenChanges, setUnseenChanges] = useState(false);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [staff, setStaff] = useState([]);

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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Bodies of water were not fetched. Try refreshing your page or try again later.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleBulkUpdate = async (
    selectedPools,
    bulkAssignedTo,
    bulkTodaysList,
    bulkStatus,
    bulkPriority
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
          status: bulkStatus || undefined,
          priority: bulkPriority || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchPools();
    } catch (err) {
      console.error("Failed to update pools", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Selected bodies of water have not been updated.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  useEffect(() => {
    fetchPools();
  }, [fetchPools]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/customers/changes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.hasUpdates) {
          setUnseenChanges(true);
        }
      } catch (err) {
        console.error("Error checking for updates:", err);
      }
    }, 300000); // 300,000ms to Check every 5 minutes

    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    if (unseenChanges) {
      Swal.fire({
        icon: "info",
        title: "New updates available!",
        text: "There are new or updated bodies of water. Please refresh to see the latest data.",
        toast: true,
        position: "top",
        confirmButtonText: "Refresh",
      }).then((result) => {
        if (result.isConfirmed) {
          fetchPools();
          setUnseenChanges(false);
        }
      });
    }
  }, [unseenChanges, fetchPools]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/employees`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStaff(response.data);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };

    fetchStaff();
  }, [token]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <GiBoatFishing className=" text-6xl text-blue-600 dark:text-blue-400" />
        <p className="dark:text-gray-50 mt-4">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="mt-3 text-xl font-bold text-red-500">{error}</div>;
  }

  return (
    <>
      <h1 className="mt-3 text-xl font-bold ">All bodies of water</h1>
      <PoolsTable
        pools={pools}
        onBulkUpdate={handleBulkUpdate}
        staff={staff}
      />{" "}
      {showScrollTopButton && (
        <div className="p-8 fixed bottom-5 left-5 flex flex-col items-center">
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            <SlArrowUp />
          </button>
          <span className="text-sm  text-blue-500 dark:text-blue-400">
            Back to Top
          </span>
        </div>
      )}
    </>
  );
};

export default Index;
