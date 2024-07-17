import { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BackButton from "../../components/BackButton";
import "quill/dist/quill.snow.css";
import { GiBoatFishing } from "react-icons/gi";

const ImagesGrid = lazy(() => import("../../components/ImagesGrid"));
const ErrorBoundary = lazy(() => import("../../components/ErrorBoundary"));

const Show = () => {
  const token = localStorage.getItem("token");
  const [pool, setPool] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/customers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data;
        data.createdAt = new Date(data.createdAt);
        data.updatedAt = new Date(data.updatedAt);
        setPool(data);
        if (data.coverImagePath && data.coverImagePath.length > 0) {
          setImages(data.coverImagePath);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: "Not able to load file. Make sure it exists and try again later",
          icon: "error",
          timer: 2500,
          timerProgressBar: true,
          position: "top-end",
          toast: true,
          showConfirmButton: false,
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
        axios
          .delete(`${import.meta.env.VITE_API_BASE_URL}/customers/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              timer: 2000,
              timerProgressBar: true,
              position: "top-end",
              toast: true,
              showConfirmButton: false,
            });
            navigate("/pools");
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Error!",
              text: "Not able to delete file. Make sure it exists and try again later.",
              icon: "error",
              timer: 2000,
              timerProgressBar: true,
              position: "top-end",
              toast: true,
              showConfirmButton: false,
            });
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <GiBoatFishing className=" text-6xl text-blue-600 " />
        <p className=" mt-4">Loading...</p>
      </div>
    );
  }

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  const DetailItem = ({ label, value, isEmail, isButton }) => {
    if (!value) return null;

    return (
      <div>
        <dt className="text-sm font-medium  ">{label}</dt>
        <dd className="mt-1 text-sm ">
          {isEmail ? (
            <button
              className="text-blue-600 dark:text-blue-400 underline"
              onClick={() => (window.location = `mailto:${value}`)}
            >
              {value}
            </button>
          ) : isButton ? (
            <span className="font-semibold underline">{value}</span>
          ) : (
            value
          )}
        </dd>
      </div>
    );
  };

  return (
    <>
      <div className="mx-auto max-w-5xl mt-4">
        <BackButton />
      </div>
      <div className="flex mb-2 space-x-2 justify-center">
        <Link to={`/pools/${pool._id}/edit`}>
          <button className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Edit
          </button>
        </Link>
        <button
          onClick={handleDelete}
          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
        >
          Delete
        </button>
      </div>

      <div className="content-center py-8 px-6 mx-auto max-w-6xl rounded-lg text-left shadow-2xl border-2">
        <div className="border-t ">
          <dl className="divide-y ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
              <DetailItem
                label="Customer name"
                value={`${pool.firstName} ${pool.lastName}`}
              />
              <DetailItem label="E-mail" value={pool.email} isEmail />
              <DetailItem
                label="Alternate E-mail"
                value={pool.altEmail}
                isEmail
              />
              <DetailItem label="Phone number" value={pool.number} />
              <DetailItem
                label="Alternate phone number"
                value={pool.altNumber}
              />
              <DetailItem label="Street" value={pool.street} />
              <DetailItem label="Town" value={pool.town} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 py-6">
              <DetailItem label="Current status" value={pool.status} isButton />
              <DetailItem
                label="Assigned to"
                value={pool.assignedTo}
                isButton
              />
              <DetailItem
                label="Condition"
                value={pool.conditionPool || pool.conditionHt}
                isButton
              />
              <DetailItem
                label="Created at"
                value={formatDate(pool.createdAt)}
                isButton
              />
              <DetailItem
                label="Last updated"
                value={formatDate(pool.updatedAt)}
                isButton
              />
              <DetailItem
                label="Today's list"
                value={pool.todaysList}
                isButton
              />
              <DetailItem label="Priority" value={pool.priority} isButton />
              <DetailItem
                label="Chlorine Demand"
                value={pool.chlorineDemand ? "Yes" : "No"}
                isButton
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 py-6">
              <DetailItem label="Body of water" value={pool.bodyOfWater} />
              <DetailItem label="System" value={pool.system} />
              <DetailItem label="HHL Build" value={pool.hhlBuild} />
              {["IG", "AG", "OG", "Other", "Pool (Unknown type)"].includes(
                pool.bodyOfWater
              ) && (
                <>
                  <DetailItem label="Pump" value={pool.pump} />
                  <DetailItem label="Filter" value={pool.filter} />
                  <DetailItem label="Pool size" value={pool.size} />
                  <DetailItem label="Heater" value={pool.heater} />
                </>
              )}
              {["HT", "SS"].includes(pool.bodyOfWater) && (
                <>
                  <DetailItem label="Brand" value={pool.brand} />
                  <DetailItem label="Make" value={pool.make} />
                </>
              )}
              <DetailItem label="Other equipment" value={pool.otherEquipment} />
            </div>
            {pool.description && (
              <div className="grid grid-cols-1 gap-8 py-6">
                <DetailItem
                  label="Description"
                  value={
                    <div className="ql-container ql-snow ">
                      <div
                        className="ql-editor"
                        dangerouslySetInnerHTML={{ __html: pool.description }}
                      />
                    </div>
                  }
                />
              </div>
            )}
          </dl>
          {images.length > 0 && (
            <div className="py-6">
              <DetailItem
                label="Images"
                value={
                  <ErrorBoundary>
                    <Suspense
                      fallback={
                        <div className="flex justify-center items-center h-64">
                          <p>Loading images...</p>
                        </div>
                      }
                    >
                      <ImagesGrid images={images} />
                    </Suspense>
                  </ErrorBoundary>
                }
              />
            </div>
          )}
          <div className="py-6 flex space-x-2 justify-center">
            <Link to={`/pools/${pool._id}/edit`}>
              <button className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Edit
              </button>
            </Link>
            <button
              onClick={handleDelete}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
