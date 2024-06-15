import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BackButton from "../../components/BackButton";

const Show = () => {
  const token = localStorage.getItem("token");
  const [pool, setPool] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/pools/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setPool(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
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
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          position: "top-end",
          toast: true,
        });
        axios
          .delete(`http://localhost:5000/pools/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            navigate("/pools");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold mt-3">Customer BoW information</h1>
      <div className="mx-auto max-w-6xl">
        <BackButton />
      </div>
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
                    <a href={`mailto:${pool.email}`}>{pool.email}</a>
                  </dd>
                  <dd className="mt-1 text-sm text-blue-600 underline">
                    <a href={`mailto:${pool.altEmail}`}>{pool.altEmail}</a>
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
                  {pool.conditionPool ? pool.conditionPool : pool.conditionHt}
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
            {pool.coverImagePath && pool.coverImagePath.length > 0 && (
              <div className="py-6">
                <dt className="text-sm font-medium text-gray-900">Images</dt>
                <dd className="mt-2 text-sm text-gray-900">
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                  >
                    {pool.coverImagePath.map((imagePath, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                      >
                        <div className="flex w-0 flex-1 items-center">
                          <div className="ml-2 flex min-w-0 flex-1 gap-2">
                            <img
                              className=""
                              style={{
                                marginTop: "10px",
                                marginBottom: "10px",
                              }}
                              src={imagePath}
                              alt={`Image ${index + 1}`}
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
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
