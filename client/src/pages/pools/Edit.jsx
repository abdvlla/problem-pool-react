// src/components/Create.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css";
import "filepond/dist/filepond.min.css";

registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation
);

const Edit = () => {
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

  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/pools/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setNumber(data.number);
        setEmail(data.email);
        setAltNumber(data.altNumber);
        setAltEmail(data.altEmail);
        setBodyOfWater(data.bodyOfWater);
        setStatus(data.status);
        setDescription(data.description);
        setSystem(data.system);
        setPump(data.pump);
        setFilter(data.filter);
        setHeater(data.heater);
        setHhlBuild(data.hhlBuild);
        setSize(data.size);
        setOtherEquipment(data.otherEquipment);
        setBrand(data.brand);
        setMake(data.make);
        setAssignedTo(data.assignedTo);
        setConditionPool(data.conditionPool);
        setConditionHt(data.conditionHt);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEditPool = () => {
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
    };
    axios
      .put(`http://localhost:5000/pools/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate(`/pools/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    navigate(`/pools/${id}`);
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
          {/* <div className="sm:col-span-2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Image(s)
              </label>
              <FilePond
                files={poolData.images.map((image) => ({
                  source: image.image,
                  options: {
                    type: "local",
                  },
                }))}
                allowMultiple={true}
                onupdatefiles={handleImageChange}
              />
            </div> */}
          <div className="flex flex-cols-2 space-x-1">
            <button
              onClick={handleCancel}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
            >
              Cancel
            </button>
            <button
              onClick={handleEditPool}
              className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Edit;
