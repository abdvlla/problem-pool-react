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
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/home`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCounts(response.data.data || {});
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
    { name: "New BoW", value: counts.newBoWCount },
    { name: "Received", value: counts.receivedCount },
    { name: "Ongoing", value: counts.ongoingCount },
    { name: "Improving", value: counts.improvingCount },
    { name: "Almost", value: counts.almostCount },
    { name: "Closed", value: counts.closedCount },
    { name: "Follow-up 1", value: counts.followUp1Count },
    { name: "Follow-up 2", value: counts.followUp2Count },
    { name: "No Update", value: counts.noUpdateCount },
    { name: "Weekly Service", value: counts.weeklyServiceCounts },
  ];

  return (
    <div className="bg-gray-50 dark:bg-neutral-800 text-gray-100 min-h-screen">
      <section className="py-12 sm:py-12 lg:py-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center xl:max-w-2xl mb-12">
            <h2 className="text-3xl font-bold leading-tight dark:text-gray-50 sm:text-4xl xl:text-5xl text-black">
              Customer Status Statistics
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative overflow-hidden bg-neutral-800 dark:bg-white shadow-md rounded-xl h-full dark:hover:bg-gray-200 hover:bg-neutral-700 transition duration-300">
              <Link to="/pools">
                <div className="p-9 text-center">
                  <h3 className="text-4xl font-bold dark:text-gray-900 text-white">
                    {counts.allBodiesOfWater}
                  </h3>
                  <h3 className="mt-6 text-2xl font-bold dark:text-gray-900 text-white">
                    All Bodies of Water
                  </h3>
                  <p className="mt-6 text-base dark:text-gray-600 text-gray-300">
                    The total number of bodies of waters in the database
                  </p>
                </div>
              </Link>
            </div>
            {pieData.map((data, index) => (
              <div
                key={index}
                className="relative overflow-hidden bg-neutral-800 dark:bg-white shadow-md rounded-xl h-full dark:hover:bg-gray-200 hover:bg-neutral-700 transition duration-300"
              >
                <div className="p-9 text-center">
                  <h3 className="text-4xl font-bold dark:text-gray-900 text-white">
                    {data.value}
                  </h3>
                  <h3 className="mt-6 text-2xl font-bold dark:text-gray-900 text-white">
                    {data.name}
                  </h3>
                  <p className="mt-6 text-base dark:text-gray-600 text-gray-300">
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
