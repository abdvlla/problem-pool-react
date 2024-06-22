import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BackButton from "../../components/BackButton";
import "quill/dist/quill.snow.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const Show = () => {
  const token = localStorage.getItem("token");
  const [pool, setPool] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        data.createdAt = new Date(data.createdAt);
        data.updatedAt = new Date(data.updatedAt);
        setPool(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: "Not able to load file. Make sure it exists and try again later",
          icon: "error",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          position: "top-end",
          toast: true,
        });
      });
  }, [id, token]);

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
          .delete(`${import.meta.env.VITE_API_BASE_URL}/customers/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            navigate("/pools");
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Error!",
              text: "Not able to delete file. Make sure it exists and try again later.",
              icon: "error",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              position: "top-end",
              toast: true,
            });
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
        <p className="dark:text-gray-50">Loading...</p>
      </div>
    );
  }

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const ImagesGrid = ({ images }) => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {images.map((imagePath, index) => (
        <div key={index} className="relative">
          <Zoom>
            <img
              className="w-full h-auto rounded-lg cursor-pointer transition-transform duration-300 transform hover:scale-105"
              src={imagePath}
              alt={`Image ${index + 1}`}
            />
          </Zoom>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="mx-auto max-w-5xl mt-4">
        <BackButton />
      </div>
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
      <h1 className="text-xl font-bold mb-4 dark:text-gray-100">
        Customer BoW information
      </h1>
      <div className="content-center py-8 px-6 mx-auto max-w-4xl bg-gray-50 dark:bg-neutral-900 shadow-lg rounded-lg text-left">
        <div className="border-t border-gray-200 dark:border-gray-700">
          <dl className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
              {pool.lastName && (
                <div>
                  <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Customer name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-700 dark:text-gray-200">
                    {pool.firstName + " " + pool.lastName}
                  </dd>
                </div>
              )}

              {pool.email && (
                <div>
                  <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    E-mail(s)
                  </dt>
                  <dd className="mt-1 text-sm text-blue-600 dark:text-blue-400 underline">
                    <button
                      className="underline"
                      onClick={() => (window.location = `mailto:${pool.email}`)}
                    >
                      {pool.email}
                    </button>
                  </dd>
                  {pool.altEmail && (
                    <dd className="mt-1 text-sm text-blue-600 dark:text-blue-400 underline">
                      <button
                        className="underline"
                        onClick={() =>
                          (window.location = `mailto:${pool.altEmail}`)
                        }
                      >
                        {pool.altEmail}
                      </button>
                    </dd>
                  )}
                </div>
              )}
              {pool.number && (
                <div>
                  <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Phone number(s)
                  </dt>
                  <dd className="mt-1 text-sm text-gray-700 dark:text-gray-200">
                    {pool.number}
                  </dd>
                  {pool.altNumber && (
                    <dd className="mt-1 text-sm text-gray-700 dark:text-gray-200">
                      {pool.altNumber}
                    </dd>
                  )}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
              <div>
                <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Current status
                </dt>
                <dd className="mt-1 text-sm text-gray-700 dark:text-gray-200 font-semibold underline">
                  {pool.status}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Assigned to
                </dt>
                <dd className="mt-1 text-sm text-gray-700 dark:text-gray-200 font-semibold underline">
                  {pool.assignedTo}
                </dd>
              </div>
              <div id="condition">
                <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Condition
                </dt>
                <dd className="mt-1 text-sm text-gray-700 dark:text-gray-200 font-semibold underline">
                  {pool.conditionPool ? pool.conditionPool : pool.conditionHt}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Created at
                </dt>
                <dd className="mt-1 text-sm text-gray-700 dark:text-gray-200 font-semibold underline">
                  {pool.createdAt.toLocaleDateString("en-US", options)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Last updated
                </dt>
                <dd className="mt-1 text-sm text-gray-700 dark:text-gray-200 font-semibold underline">
                  {pool.updatedAt.toLocaleDateString("en-US", options)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Today's list
                </dt>
                <dd className="mt-1 text-sm text-gray-700 dark:text-gray-200 font-semibold underline">
                  {pool.todaysList}
                </dd>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
              <div>
                <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Body of water
                </dt>
                <dd className="mt-1 text-sm text-gray-700 dark:text-gray-200">
                  {pool.bodyOfWater}
                </dd>
              </div>
              {pool.system && (
                <div>
                  <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    System
                  </dt>
                  <dd className="mt-1 text-sm text-gray-700 dark:text-gray-200">
                    {pool.system}
                  </dd>
                </div>
              )}
              {pool.hhlBuild && (
                <div>
                  <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    HHL Build
                  </dt>
                  <dd className="mt-1 text-sm text-gray-700 dark:text-gray-200">
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
                        <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Pump
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 dark:text-gray-200">
                          {pool.pump}
                        </dd>
                      </div>
                    )}
                    {pool.filter && (
                      <div id="filter">
                        <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Filter
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 dark:text-gray-200">
                          {pool.filter}
                        </dd>
                      </div>
                    )}
                    {pool.size && (
                      <div id="size">
                        <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Pool size
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 dark:text-gray-200">
                          {pool.size}
                        </dd>
                      </div>
                    )}
                    {pool.heater && (
                      <div id="heater">
                        <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Heater
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 dark:text-gray-200">
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
                        <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Brand
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 dark:text-gray-200">
                          {pool.brand}
                        </dd>
                      </div>
                    )}
                    {pool.make && (
                      <div id="make">
                        <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Make
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 dark:text-gray-200">
                          {pool.make}
                        </dd>
                      </div>
                    )}
                  </>
                )}

              {pool.otherEquipment && (
                <div>
                  <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Other equipment
                  </dt>
                  <dd className="mt-1 text-sm text-gray-700 dark:text-gray-200">
                    {pool.otherEquipment}
                  </dd>
                </div>
              )}
            </div>
            {pool.description && (
              <div className="grid grid-cols-1 gap-8 py-6">
                <div>
                  <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Description
                  </dt>
                  <dd className="mt-1 text-sm text-gray-700 dark:text-gray-200 whitespace-pre-line">
                    <div className="ql-container ql-snow dark:bg-neutral-800 dark:border-gray-700">
                      <div
                        className="ql-editor dark:text-white"
                        dangerouslySetInnerHTML={{ __html: pool.description }}
                      />
                    </div>
                  </dd>
                </div>
              </div>
            )}
            {pool.coverImagePath && pool.coverImagePath.length > 0 && (
              <div className="py-6">
                <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Images
                </dt>
                <dd className="mt-2 text-sm text-gray-900 dark:text-gray-100">
                  <ImagesGrid images={pool.coverImagePath} />
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
