import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCounts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <section className="py-12 bg-gray-900 text-gray-100 sm:py-12 lg:py-16">
        <div className="px-4 mx-auto max-w-4xl sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center xl:max-w-2xl">
            <h2 className="text-3xl font-bold leading-tight text-gray-50 sm:text-4xl xl:text-5xl mb-6">
              Customer Status Statistics
            </h2>
          </div>
          <div className="relative mt-2">
            <Link to="/pools">
              <div className="relative overflow-hidden bg-white shadow-md rounded-xl h-full hover:bg-gray-200 transition duration-300">
                <div className="p-9">
                  <h3 className="w-12 h-9 mx-auto text-gray-900 text-4xl font-bold sm:mx-0">
                    {counts.allBodiesOfWater}
                  </h3>
                  <h3 className="mt-6 text-2xl font-bold text-gray-900 sm:mt-10">
                    All Bodies of Water
                  </h3>
                  <p className="mt-6 text-base text-gray-600">
                    The total number of bodies of waters in the database
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="grid max-w-4xl lg:max-w-6xl grid-cols-1 mx-auto mt-8 text-center gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 sm:mt-12 lg:mt-20 sm:text-left">
            <div className="relative overflow-hidden bg-white shadow-md rounded-xl h-full hover:bg-gray-200 transition duration-300">
              <div className="p-9">
                <h3 className="w-12 h-9 mx-auto text-gray-900 text-4xl font-bold sm:mx-0">
                  {counts.newBoWCount}
                </h3>
                <h3 className="mt-6 text-2xl font-bold text-gray-900 sm:mt-10">
                  New BoW
                </h3>
                <p className="mt-6 text-base text-gray-600">
                  These are the bodies of water that have been recently added.
                </p>
              </div>
            </div>
            <a className="relative">
              <div className="relative overflow-hidden bg-white shadow-md rounded-xl h-full hover:bg-gray-200 transition duration-300">
                <div className="p-9">
                  <h3 className="w-12 h-12 mx-auto text-gray-900 text-4xl font-bold sm:mx-0">
                    {counts.receivedCount}
                  </h3>
                  <h3 className="mt-6 text-2xl font-bold text-gray-900 sm:mt-10">
                    Received
                  </h3>
                  <p className="mt-6 text-base text-gray-600">
                    These are the bodies of water that have been received.
                  </p>
                </div>
              </div>
            </a>
            <div className="relative overflow-hidden bg-white shadow-md rounded-xl h-full hover:bg-gray-200 transition duration-300">
              <div className="p-9">
                <h3 className="w-12 h-12 mx-auto text-gray-900 text-4xl font-bold sm:mx-0">
                  {counts.ongoingCount}
                </h3>
                <h3 className="mt-6 text-2xl font-bold text-gray-900 sm:mt-10">
                  Ongoing
                </h3>
                <p className="mt-6 text-base text-gray-600">
                  These are the bodies of water that are currently being
                  investigated and worked on.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden bg-white shadow-md rounded-xl h-full hover:bg-gray-200 transition duration-300">
              <div className="p-9">
                <h3 className="w-12 h-12 mx-auto text-gray-900 text-4xl font-bold sm:mx-0">
                  {counts.improvingCount}
                </h3>
                <h3 className="mt-6 text-2xl font-bold text-gray-900 sm:mt-10">
                  Improving
                </h3>
                <p className="mt-6 text-base text-gray-600">
                  Bodies of water that are finding progress and getting clearer.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden bg-white shadow-md rounded-xl h-full hover:bg-gray-200 transition duration-300">
              <div className="p-9">
                <h3 className="w-12 h-12 mx-auto text-gray-900 text-4xl font-bold sm:mx-0">
                  {counts.almostCount}
                </h3>
                <h3 className="mt-6 text-2xl font-bold text-gray-900 sm:mt-10">
                  Almost
                </h3>
                <p className="mt-6 text-base text-gray-600">
                  These are the bodies of water that are on the verge of
                  clearing up but need a little more time.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden bg-white shadow-md rounded-xl h-full hover:bg-gray-200 transition duration-300">
              <div className="p-9">
                <h3 className="w-12 h-12 mx-auto text-gray-900 text-4xl font-bold sm:mx-0">
                  {counts.closedCount}
                </h3>
                <h3 className="mt-6 text-2xl font-bold text-gray-900 sm:mt-10">
                  Closed
                </h3>
                <p className="mt-6 text-base text-gray-600">
                  These are the bodies of water that have a closed status.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden bg-white shadow-md rounded-xl h-full hover:bg-gray-200 transition duration-300">
              <div className="p-9">
                <h3 className="w-12 h-12 mx-auto text-gray-900 text-4xl font-bold sm:mx-0">
                  {counts.followUp1Count}
                </h3>
                <h3 className="mt-6 text-2xl font-bold text-gray-900 sm:mt-10">
                  Follow-up 1
                </h3>
                <p className="mt-6 text-base text-gray-600">
                  Customers that have been contacted regarding their body of
                  water.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden bg-white shadow-md rounded-xl h-full hover:bg-gray-200 transition duration-300">
              <div className="p-9">
                <h3 className="w-12 h-12 mx-auto text-gray-900 text-4xl font-bold sm:mx-0">
                  {counts.followUp2Count}
                </h3>
                <h3 className="mt-6 text-2xl font-bold text-gray-900 sm:mt-10">
                  Follow-up 2
                </h3>
                <p className="mt-6 text-base text-gray-600">
                  Customers that have been contacted a second time, following
                  the first time.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden bg-white shadow-md rounded-xl h-full hover:bg-gray-200 transition duration-300">
              <div className="p-9">
                <h3 className="w-12 h-12 mx-auto text-gray-900 text-4xl font-bold sm:mx-0">
                  {counts.noUpdateCount}
                </h3>
                <h3 className="mt-6 text-2xl font-bold text-gray-900 sm:mt-10">
                  No Update
                </h3>
                <p className="mt-6 text-base text-gray-600">
                  Customers who have been contacted twice and have not
                  responded.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
