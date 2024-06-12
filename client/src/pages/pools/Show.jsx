// src/components/Show.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Show = () => {
  const [pool, setPool] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/pools/${id}`)
      .then((response) => {
        setPool(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        axios
          .delete(`http://localhost:5000/pools/${id}`)
          .then(() => {
            navigate("/pools");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Customer BoW information</h1>
      <div className="content-center py-8 px-6 mx-auto max-w-4xl bg-gray-50 shadow-lg rounded-lg text-left">
        <div className="border-t border-gray-200">
          <dl className="divide-y divide-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
              {pool.lastName && (
                <div>
                  <dt className="text-sm font-medium text-gray-900">
                    Customer name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-700">
                    {pool.firstName + " " + pool.lastName}
                  </dd>
                </div>
              )}

              {pool.email && (
                <div>
                  <dt className="text-sm font-medium text-gray-900">E-mail</dt>
                  <dd className="mt-1 text-sm text-blue-600 underline">
                    <a>{pool.email}</a>
                  </dd>
                  <dd className="mt-1 text-sm text-blue-600 underline">
                    <a>{pool.altEmail}</a>
                  </dd>
                </div>
              )}
              {pool.number && (
                <div>
                  <dt className="text-sm font-medium text-gray-900">
                    Phone number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-700">{pool.number}</dd>
                  <dd className="mt-1 text-sm text-gray-700">
                    {pool.altNumber}
                  </dd>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
              <div>
                <dt className="text-sm font-medium text-gray-900">
                  Current status
                </dt>
                <dd className="mt-1 text-sm text-gray-700 font-semibold underline">
                  {pool.status}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-900">
                  Assigned to
                </dt>
                <dd className="mt-1 text-sm text-gray-700 font-semibold underline">
                  {pool.assignedTo}
                </dd>
              </div>
              <div id="condition">
                <dt className="text-sm font-medium text-gray-900">Condition</dt>
                <dd className="mt-1 text-sm text-gray-700 font-semibold underline">
                  {pool.condition}
                </dd>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
              <div>
                <dt className="text-sm font-medium text-gray-900">
                  Body of water
                </dt>
                <dd className="mt-1 text-sm text-gray-700">
                  {pool.bodyOfWater}
                </dd>
              </div>
              {pool.system && (
                <div>
                  <dt className="text-sm font-medium text-gray-900">System</dt>
                  <dd className="mt-1 text-sm text-gray-700">{pool.system}</dd>
                </div>
              )}
              {pool.hhlBuild && (
                <div>
                  <dt className="text-sm font-medium text-gray-900">
                    HHL Build
                  </dt>
                  <dd className="mt-1 text-sm text-gray-700">
                    {pool.hhlBuild}
                  </dd>
                </div>
              )}

              {pool.bodyOfWater &&
                (pool.bodyOfWater === "IG" ||
                  pool.bodyOfWater === "AG" ||
                  pool.bodyOfWater === "OG" ||
                  pool.bodyOfWater === "Other" ||
                  pool.bodyOfWater === "Pool (Unknown type)") && (
                  <>
                    {pool.pump && (
                      <div id="pump">
                        <dt className="text-sm font-medium text-gray-900">
                          Pump
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700">
                          {pool.pump}
                        </dd>
                      </div>
                    )}
                    {pool.filter && (
                      <div id="filter">
                        <dt className="text-sm font-medium text-gray-900">
                          Filter
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700">
                          {pool.filter}
                        </dd>
                      </div>
                    )}
                    {pool.size && (
                      <div id="size">
                        <dt className="text-sm font-medium text-gray-900">
                          Pool size
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700">
                          {pool.size}
                        </dd>
                      </div>
                    )}
                    {pool.heater && (
                      <div id="heater">
                        <dt className="text-sm font-medium text-gray-900">
                          Heater
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700">
                          {pool.heater}
                        </dd>
                      </div>
                    )}
                  </>
                )}

              {pool.bodyOfWater &&
                (pool.bodyOfWater === "HT" || pool.bodyOfWater === "SS") && (
                  <>
                    {pool.brand && (
                      <div id="brand">
                        <dt className="text-sm font-medium text-gray-900">
                          Brand
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700">
                          {pool.brand}
                        </dd>
                      </div>
                    )}
                    {pool.make && (
                      <div id="make">
                        <dt className="text-sm font-medium text-gray-900">
                          Make
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700">
                          {pool.make}
                        </dd>
                      </div>
                    )}
                  </>
                )}

              {pool.otherEquipment && (
                <div>
                  <dt className="text-sm font-medium text-gray-900">
                    Other equipment
                  </dt>
                  <dd className="mt-1 text-sm text-gray-700">
                    {pool.otherEquipment}
                  </dd>
                </div>
              )}
            </div>
            {pool.description && (
              <div className="grid grid-cols-1 gap-8 py-6">
                <div>
                  <dt className="text-sm font-medium text-gray-900">
                    Description
                  </dt>
                  <dd className="mt-1 text-sm text-gray-700 whitespace-pre-line">
                    {pool.description}
                  </dd>
                </div>
              </div>
            )}
            {/* {pool.images && (
            <div className="py-6">
              <dt className="text-sm font-medium text-gray-900">Images</dt>
              <dd className="mt-2 text-sm text-gray-900"></dd>
            </div>
          )} */}
          </dl>
          <div className="py-6 flex space-x-2 justify-center">
            <Link to={`/pools/${pool._id}/edit`}>
              <button className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Edit
              </button>
            </Link>
            <Link>
              <button
                onClick={handleDelete}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
              >
                Delete
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
