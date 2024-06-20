import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BackButton from "../../components/BackButton";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import Quill from "quill";
import "quill/dist/quill.snow.css";

registerPlugin(FilePondPluginFileEncode, FilePondPluginImagePreview);

const Create = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [altNumber, setAltNumber] = useState("");
  const [altEmail, setAltEmail] = useState("");
  const [bodyOfWater, setBodyOfWater] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [system, setSystem] = useState("");
  const [pump, setPump] = useState("");
  const [filter, setFilter] = useState("");
  const [heater, setHeater] = useState("");
  const [hhlBuild, setHhlBuild] = useState("");
  const [size, setSize] = useState("");
  const [otherEquipment, setOtherEquipment] = useState("");
  const [brand, setBrand] = useState("");
  const [make, setMake] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [conditionPool, setConditionPool] = useState("");
  const [conditionHt, setConditionHt] = useState("");
  const [todaysList, setTodaysList] = useState("");

  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const quillRef = useRef(null);

  useEffect(() => {
    const quill = new Quill(quillRef.current, {
      theme: "snow",
    });

    quill.on("text-change", () => {
      setDescription(quill.root.innerHTML);
    });
  }, []);

  const handleSavePool = () => {
    if (!firstName || !lastName || !bodyOfWater) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill out name and body of water.",
      });
      return;
    }

    setIsLoading(true);

    const images = files.map((fileItem) => {
      const file = fileItem.getFileEncodeBase64String();
      const type = fileItem.fileType;
      return JSON.stringify({ type, data: file });
    });

    const data = {
      firstName,
      lastName,
      number,
      email,
      altNumber,
      altEmail,
      bodyOfWater,
      status,
      description,
      system,
      pump,
      filter,
      heater,
      hhlBuild,
      size,
      otherEquipment,
      brand,
      make,
      assignedTo,
      conditionPool,
      conditionHt,
      images,
      todaysList,
    };
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/customers`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        maxBodyLength: Infinity,
      })
      .then((response) => {
        setIsLoading(false);
        const createdPoolId = response.data._id;
        navigate(`/pools/${createdPoolId}`);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Body of water successfully added.",
          width: 500,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Body of water not added.",
          width: 500,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <section className="">
      <div className="mx-auto max-w-5xl mt-4">
        <BackButton />
      </div>
      <h1 className="text-xl font-bold mb-4 dark:text-gray-100">
        Add a new body of water
      </h1>
      <div className="px-4 mx-auto max-w-2xl lg:py-8 rounded overflow-hidden shadow-lg dark:shadow-gray-400 bg-gray-50 dark:bg-neutral-900">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 text-left">
          <div className="max-w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Customer first name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="First name"
            />
          </div>
          <div className="max-w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Customer last name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Last name"
              required={true}
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Email"
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Phone #
            </label>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="(902) XXX-XXXX"
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Alternative email
            </label>
            <input
              type="email"
              value={altEmail}
              onChange={(e) => setAltEmail(e.target.value)}
              className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Email"
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Alternative phone #
            </label>
            <input
              type="text"
              value={altNumber}
              onChange={(e) => setAltNumber(e.target.value)}
              className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="(902) XXX-XXXX"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Body of Water
            </label>
            <select
              value={bodyOfWater}
              onChange={(e) => setBodyOfWater(e.target.value)}
              className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            >
              <option value=""></option>
              <option value="Pool (Unknown type)">Pool (Unknown type)</option>
              <option value="IG">IG</option>
              <option value="AG">AG</option>
              <option value="OG">OG</option>
              <option value="HT">HT</option>
              <option value="SS">SS</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            >
              <option value=""></option>
              <option value="New BoW">New BoW</option>
              <option value="Received">Received</option>
              <option value="Weekly service">Weekly service</option>
              <option value="Follow-up 1">Follow-up 1</option>
              <option value="Follow-up 2">Follow-up 2</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Improving">Improving</option>
              <option value="No update">No update</option>
              <option value="Almost">Almost</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              System
            </label>
            <input
              type="text"
              value={system}
              onChange={(e) => setSystem(e.target.value)}
              className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Maintenance chemicals"
            />
          </div>
          {["Pool (Unknown type)", "IG", "AG", "OG"].includes(bodyOfWater) && (
            <>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Pool size
                </label>
                <input
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Pool size"
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Pump
                </label>
                <input
                  type="text"
                  value={pump}
                  onChange={(e) => setPump(e.target.value)}
                  className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Pool pump"
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Filter
                </label>
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Pool filter"
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Heater
                </label>
                <input
                  type="text"
                  value={heater}
                  onChange={(e) => setHeater(e.target.value)}
                  className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Heating system (if any)"
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Condition
                </label>
                <select
                  value={conditionPool}
                  onChange={(e) => setConditionPool(e.target.value)}
                  className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                >
                  <option value=""></option>
                  <option value="Clear">Clear</option>
                  <option value="Blue/Cloudy (cannot see floor)">
                    Blue/Cloudy (cannot see floor)
                  </option>
                  <option value="Milky Dead Algae">Milky Dead Algae</option>
                  <option value="Hazy">Hazy</option>
                  <option value="Algae - Green Cloudy">
                    Algae - Green Cloudy
                  </option>
                  <option value="Algae - On Floor">Algae - On Floor</option>
                  <option value="Discolored water">Discolored water</option>
                  <option value="Stains">Stains</option>
                  <option value="Fine debris settling on floor">
                    Fine debris settling on floor
                  </option>
                  <option value="Zero Alkalinity">Zero Alkalinity</option>
                </select>
              </div>
            </>
          )}
          {["HT", "SS"].includes(bodyOfWater) && (
            <>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Brand
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Brand"
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Make
                </label>
                <input
                  type="text"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Make"
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Condition
                </label>
                <select
                  value={conditionHt}
                  onChange={(e) => setConditionHt(e.target.value)}
                  className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                >
                  <option value=""></option>
                  <option value="Clear">Clear</option>
                  <option value="Cloudy">Cloudy</option>
                  <option value="Foaming">Foaming</option>
                  <option value="Odors">Odors</option>
                  <option value="Stains">Stains</option>
                  <option value="Discolored water">Discolored water</option>
                  <option value="Scale">Scale</option>
                  <option value="Biofilm">Biofilm</option>
                </select>
              </div>
            </>
          )}
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Other equipment
            </label>
            <input
              type="text"
              value={otherEquipment}
              onChange={(e) => setOtherEquipment(e.target.value)}
              className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Other equipment (if any)"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Assigned to
            </label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            >
              <option value=""></option>
              <option value="Colby">Colby</option>
              <option value="Jenn">Jenn</option>
              <option value="Jessica">Jessica</option>
              <option value="Amaya">Amaya</option>
              <option value="Ben">Ben</option>
              <option value="Hannah">Hannah</option>
              <option value="Jack">Jack</option>
              <option value="Jaime">Jaime</option>
            </select>
          </div>
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Today's List
            </label>
            <select
              value={todaysList}
              onChange={(e) => setTodaysList(e.target.value)}
              className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            >
              <option value=""></option>
              <option value="Yes">Yes</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="max-w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              HHL Build
            </label>
            <div className="flex gap-x-3">
              <div className="flex space-x-0.5">
                <input
                  type="radio"
                  name="hhlBuild"
                  value="Yes"
                  checked={hhlBuild === "Yes"}
                  onChange={(e) => setHhlBuild(e.target.value)}
                />
                <label className="text-sm text-gray-500 dark:text-gray-400 ms-3">
                  Yes
                </label>
              </div>
              <div className="flex space-x-0.5">
                <input
                  type="radio"
                  name="hhlBuild"
                  value="No"
                  checked={hhlBuild === "No"}
                  onChange={(e) => setHhlBuild(e.target.value)}
                />
                <label className="text-sm text-gray-500 dark:text-gray-400 ms-3">
                  No
                </label>
              </div>
              <div className="flex space-x-0.5">
                <input
                  type="radio"
                  name="hhlBuild"
                  value="Unknown"
                  checked={hhlBuild === "Unknown"}
                  onChange={(e) => setHhlBuild(e.target.value)}
                />
                <label className="text-sm text-gray-500 dark:text-gray-400 ms-3">
                  Unknown
                </label>
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Description
              </label>
              <div
                className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700  p-2 dark:text-white"
                ref={quillRef}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={true}
              allowReorder={true}
              maxTotalFileSize="20MB"
              name="images"
              labelIdle='Drag & drop your images or <span class="filepond--label-action">Browse</span>'
              className="bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 rounded-lg"
            />
          </div>
          <div className="flex flex-cols-2 space-x-1">
            <button
              onClick={handleCancel}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleSavePool}
              className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Create;
