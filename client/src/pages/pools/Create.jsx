import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

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

  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
    };
    axios
      .post("http://localhost:5000/pools", data, {
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
    <section className="dark:bg-gray-900">
      <h1 className="text-xl font-bold mt-3">Add a new body of water</h1>
      <div className="px-4 mx-auto max-w-2xl lg:py-8 rounded overflow-hidden shadow-lg">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 text-left">
          <div className="max-w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Customer first name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="First name"
            />
          </div>
          <div className="max-w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Customer last name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Last name"
              required={true}
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Email"
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Phone #
            </label>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="(902) XXX-XXXX"
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Alternative email
            </label>
            <input
              type="email"
              value={altEmail}
              onChange={(e) => setAltEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Email"
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Alternative phone #
            </label>
            <input
              type="text"
              value={altNumber}
              onChange={(e) => setAltNumber(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="(902) XXX-XXXX"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Body of Water
            </label>
            <select
              value={bodyOfWater}
              onChange={(e) => setBodyOfWater(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value=""></option>
              <option value="New BoW">New BoW</option>
              <option value="Received">Received</option>
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
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              System
            </label>
            <input
              type="text"
              value={system}
              onChange={(e) => setSystem(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Maintenance chemicals"
            />
          </div>
          {["Pool (Unknown type)", "IG", "AG", "OG"].includes(bodyOfWater) && (
            <>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Pool size
                </label>
                <input
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Pool size"
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Pump
                </label>
                <input
                  type="text"
                  value={pump}
                  onChange={(e) => setPump(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Pool pump"
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Filter
                </label>
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Pool filter"
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Heater
                </label>
                <input
                  type="text"
                  value={heater}
                  onChange={(e) => setHeater(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Heating system (if any)"
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Condition
                </label>
                <select
                  value={conditionPool}
                  onChange={(e) => setConditionPool(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Brand
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Brand"
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Make
                </label>
                <input
                  type="text"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Make"
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Condition
                </label>
                <select
                  value={conditionHt}
                  onChange={(e) => setConditionHt(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Other equipment
            </label>
            <input
              type="text"
              value={otherEquipment}
              onChange={(e) => setOtherEquipment(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Other equipment (if any)"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Assigned to
            </label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus
block w-full p-2.5"
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
          <div className="max-w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                <label className="text-sm text-gray-500 ms-3">Yes</label>
              </div>
              <div className="flex space-x-0.5">
                <input
                  type="radio"
                  name="hhlBuild"
                  value="No"
                  checked={hhlBuild === "No"}
                  onChange={(e) => setHhlBuild(e.target.value)}
                />
                <label className="text-sm text-gray-500 ms-3">No</label>
              </div>
              <div className="flex space-x-0.5">
                <input
                  type="radio"
                  name="hhlBuild"
                  value="Unknown"
                  checked={hhlBuild === "Unknown"}
                  onChange={(e) => setHhlBuild(e.target.value)}
                />
                <label className="text-sm text-gray-500 ms-3">Unknown</label>
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <textarea
              type="text"
              rows="8"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Description"
            />
          </div>
          <div className="sm:col-span-2">
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={true}
              maxTotalFileSize="100MB"
              name="images"
              labelIdle='Drag & drop your images or <span class="filepond--label-action">Browse</span>'
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
