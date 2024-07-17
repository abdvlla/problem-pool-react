import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const token = localStorage.getItem("token");
  const [counts, setCounts] = useState({
    allBodiesOfWater: 0,
    newBoWCount: 0,
    receivedCount: 0,
    ongoingCount: 0,
    improvingCount: 0,
    almostCount: 0,
    closedCount: 0,
    followUp1Count: 0,
    followUp2Count: 0,
    noUpdateCount: 0,
    weeklyServiceCounts: 0,
  });

  useEffect(() => {
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    const fetchCounts = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/home`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCounts(data.data || {});
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Unable to fetch data. Check console for details.",
          width: 500,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    };

    fetchCounts();
  }, [token]);

  const pieData = [
    { name: "New BoW", value: counts.newBoWCount, color: "border-blue-500" },
    {
      name: "Received",
      value: counts.receivedCount,
      color: "border-green-500",
    },
    { name: "Ongoing", value: counts.ongoingCount, color: "border-yellow-500" },
    {
      name: "Improving",
      value: counts.improvingCount,
      color: "border-purple-500",
    },
    { name: "Almost", value: counts.almostCount, color: "border-orange-500" },
    { name: "Closed", value: counts.closedCount, color: "border-red-500" },
    {
      name: "Follow-up 1",
      value: counts.followUp1Count,
      color: "border-teal-500",
    },
    {
      name: "Follow-up 2",
      value: counts.followUp2Count,
      color: "border-indigo-500",
    },
    {
      name: "No Update",
      value: counts.noUpdateCount,
      color: "border-gray-500",
    },
    {
      name: "Weekly Service",
      value: counts.weeklyServiceCounts,
      color: "border-pink-500",
    },
  ];

  return (
    <div className="  min-h-screen">
      <section className="py-12 sm:py-12 lg:py-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center xl:max-w-2xl mb-12">
            <h2 className="text-3xl font-bold leading-tight  sm:text-4xl xl:text-5xl">
              Customer Status Statistics
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              to="/pools"
              className="relative overflow-hidden  bg-white shadow-md rounded-xl h-full hover:bg-gray-200 active:bg-gray-500   transition duration-300 border-4  hover:border-gray-600"
            >
              <div className="p-9 text-center">
                <h3 className="text-4xl font-bold text-gray-900 ">
                  {counts.allBodiesOfWater}
                </h3>
                <h3 className="mt-6 text-2xl font-bold text-gray-900 ">
                  All Bodies of Water
                </h3>
                <p className="mt-6 text-base text-gray-600 ">
                  The total number of bodies of waters in the database
                </p>
              </div>
            </Link>
            {pieData.map((data, index) => (
              <div
                key={index}
                className={`relative overflow-hidden  bg-white shadow-md rounded-xl h-full hover:bg-gray-200  transition duration-300 border-4 ${data.color}`}
              >
                <div className="p-9 text-center">
                  <h3 className="text-4xl font-bold text-gray-900">
                    {data.value}
                  </h3>
                  <h3 className="mt-6 text-2xl font-bold text-gray-900">
                    {data.name}
                  </h3>
                  <p className="mt-6 text-base text-gray-600 ">
                    {`These are the bodies of water that are in the ${data.name} status.`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
