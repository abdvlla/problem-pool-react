import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import BackButton from "../../components/BackButton";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css";
import "filepond/dist/filepond.min.css";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { GiBoatFishing } from "react-icons/gi";

registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation
);

const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  name,
}) => (
  <div className="w-full">
    <label className="block mb-2 text-sm font-medium ">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      className="  border    text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      placeholder={placeholder}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options, name }) => (
  <div className="w-full">
    <label className="block mb-2 text-sm font-medium ">{label}</label>
    <select
      value={value}
      onChange={onChange}
      name={name}
      className="  border    text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const formatPhoneNumber = (value) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
};

const Edit = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    altNumber: "",
    altEmail: "",
    bodyOfWater: "",
    status: "",
    description: "",
    system: "",
    pump: "",
    filter: "",
    heater: "",
    hhlBuild: "",
    size: "",
    otherEquipment: "",
    brand: "",
    make: "",
    assignedTo: "",
    conditionPool: "",
    conditionHt: "",
    todaysList: "",
    priority: "",
    street: "",
    town: "",
    chlorineDemand: false,
  });

  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const quillRef = useRef(null);
  const quillInstance = useRef(null);

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    ["link", "image"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/employees`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStaff(response.data);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };

    fetchStaff();

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          number: data.number,
          email: data.email,
          altNumber: data.altNumber,
          altEmail: data.altEmail,
          bodyOfWater: data.bodyOfWater,
          status: data.status,
          description: data.description,
          system: data.system,
          pump: data.pump,
          filter: data.filter,
          heater: data.heater,
          hhlBuild: data.hhlBuild,
          size: data.size,
          otherEquipment: data.otherEquipment,
          brand: data.brand,
          make: data.make,
          assignedTo: data.assignedTo,
          conditionPool: data.conditionPool,
          conditionHt: data.conditionHt,
          todaysList: data.todaysList,
          priority: data.priority,
          street: data.street,
          town: data.town,
          chlorineDemand: data.chlorineDemand,
        });
        setExistingImages(data.coverImagePath);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Unable to load file. Make sure it exists and try again later.",
          icon: "error",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          position: "top-end",
          toast: true,
        });
        setLoading(false);
      });
  }, [id, token]);

  useEffect(() => {
    if (!loading && quillRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: toolbarOptions,
        },
      });
      quillInstance.current.root.innerHTML = formData.description;
      quillInstance.current.on("text-change", () => {
        setFormData((prev) => ({
          ...prev,
          description: quillInstance.current.root.innerHTML,
        }));
      });
    }
  }, [loading, quillRef.current]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "number" || name === "altNumber") {
      setFormData((prev) => ({ ...prev, [name]: formatPhoneNumber(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditPool = () => {
    const { firstName, lastName, bodyOfWater } = formData;

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

    axios
      .put(
        `${import.meta.env.VITE_API_BASE_URL}/customers/${id}`,
        { ...formData, images, removedImages },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setIsLoading(false);
        navigate(`/pools/${id}`);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Body of water successfully updated.",
          width: 500,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Body of water not updated.",
          width: 500,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      });
  };

  const handleCancel = () => {
    navigate(`/pools/${id}`);
    Swal.fire({
      icon: "warning",
      title: "Warning!",
      text: "Your changes were not saved.",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    });
  };

  const handleRemoveImage = (image) => {
    setRemovedImages((prev) => [...prev, image]);
    setExistingImages((prev) => prev.filter((img) => img !== image));
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <GiBoatFishing className="text-6xl text-blue-600 " />
        <p className=" mt-4">Loading...</p>
      </div>
    );
  }

  return (
    <section className="">
      <div className="mx-auto max-w-5xl mt-4">
        <BackButton />
      </div>
      <h1 className="text-xl font-bold mb-4 ">Edit body of water</h1>
      <div className="px-4 mx-auto max-w-2xl lg:py-8 rounded overflow-hidden shadow-xl">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 text-left">
          <InputField
            label="Customer first name"
            value={formData.firstName}
            onChange={handleInputChange}
            name="firstName"
          />
          <InputField
            label="Customer last name"
            value={formData.lastName}
            onChange={handleInputChange}
            name="lastName"
          />
          <InputField
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            name="email"
          />
          <InputField
            label="Phone #"
            value={formData.number}
            onChange={handleInputChange}
            name="number"
            placeholder="(902) XXX-XXXX"
          />
          <InputField
            label="Alternative email"
            type="email"
            value={formData.altEmail}
            onChange={handleInputChange}
            name="altEmail"
          />
          <InputField
            label="Alternative phone #"
            value={formData.altNumber}
            onChange={handleInputChange}
            name="altNumber"
            placeholder="(902) XXX-XXXX"
          />
          <InputField
            label="Street"
            value={formData.street}
            onChange={handleInputChange}
            name="street"
            placeholder="Street address"
          />
          <InputField
            label="Town"
            value={formData.town}
            onChange={handleInputChange}
            name="town"
            placeholder="Town"
          />
          <SelectField
            label="Body of Water"
            value={formData.bodyOfWater}
            onChange={handleInputChange}
            name="bodyOfWater"
            options={[
              { value: "", label: "" },
              { value: "Pool (Unknown type)", label: "Pool (Unknown type)" },
              { value: "IG", label: "IG" },
              { value: "AG", label: "AG" },
              { value: "OG", label: "OG" },
              { value: "HT", label: "HT" },
              { value: "SS", label: "SS" },
              { value: "Other", label: "Other" },
            ]}
          />
          <SelectField
            label="Status"
            value={formData.status}
            onChange={handleInputChange}
            name="status"
            options={[
              { value: "", label: "" },
              { value: "New BoW", label: "New BoW" },
              { value: "Received", label: "Received" },
              { value: "Weekly service", label: "Weekly service" },
              { value: "Follow-up 1", label: "Follow-up 1" },
              { value: "Follow-up 2", label: "Follow-up 2" },
              { value: "Ongoing", label: "Ongoing" },
              { value: "Improving", label: "Improving" },
              { value: "No update", label: "No update" },
              { value: "Almost", label: "Almost" },
              { value: "Closed", label: "Closed" },
            ]}
          />
          <InputField
            label="System"
            value={formData.system}
            onChange={handleInputChange}
            name="system"
            placeholder="Maintenance chemicals"
          />
          {["Pool (Unknown type)", "IG", "AG", "OG"].includes(
            formData.bodyOfWater
          ) && (
            <>
              <InputField
                label="Pool size"
                value={formData.size}
                onChange={handleInputChange}
                name="size"
                placeholder="Pool size"
              />
              <InputField
                label="Pump"
                value={formData.pump}
                onChange={handleInputChange}
                name="pump"
                placeholder="Pool pump"
              />
              <InputField
                label="Filter"
                value={formData.filter}
                onChange={handleInputChange}
                name="filter"
                placeholder="Pool filter"
              />
              <InputField
                label="Heater"
                value={formData.heater}
                onChange={handleInputChange}
                name="heater"
                placeholder="Heating system (if any)"
              />
              <SelectField
                label="Condition"
                value={formData.conditionPool}
                onChange={handleInputChange}
                name="conditionPool"
                options={[
                  { value: "", label: "" },
                  { value: "Clear", label: "Clear" },
                  {
                    value: "Blue/Cloudy (cannot see floor)",
                    label: "Blue/Cloudy (cannot see floor)",
                  },
                  { value: "Milky Dead Algae", label: "Milky Dead Algae" },
                  { value: "Hazy", label: "Hazy" },
                  {
                    value: "Algae - Green Cloudy",
                    label: "Algae - Green Cloudy",
                  },
                  { value: "Algae - On Floor", label: "Algae - On Floor" },
                  { value: "Discolored water", label: "Discolored water" },
                  { value: "Stains", label: "Stains" },
                  {
                    value: "Fine debris settling on floor",
                    label: "Fine debris settling on floor",
                  },
                  { value: "Zero Alkalinity", label: "Zero Alkalinity" },
                ]}
              />
            </>
          )}
          {["HT", "SS"].includes(formData.bodyOfWater) && (
            <>
              <InputField
                label="Brand"
                value={formData.brand}
                onChange={handleInputChange}
                name="brand"
                placeholder="Brand"
              />
              <InputField
                label="Make"
                value={formData.make}
                onChange={handleInputChange}
                name="make"
                placeholder="Make"
              />
              <SelectField
                label="Condition"
                value={formData.conditionHt}
                onChange={handleInputChange}
                name="conditionHt"
                options={[
                  { value: "", label: "" },
                  { value: "Clear", label: "Clear" },
                  { value: "Cloudy", label: "Cloudy" },
                  { value: "Foaming", label: "Foaming" },
                  { value: "Odors", label: "Odors" },
                  { value: "Stains", label: "Stains" },
                  { value: "Discolored water", label: "Discolored water" },
                  { value: "Scale", label: "Scale" },
                  { value: "Biofilm", label: "Biofilm" },
                ]}
              />
            </>
          )}
          <InputField
            label="Other equipment"
            value={formData.otherEquipment}
            onChange={handleInputChange}
            name="otherEquipment"
            placeholder="Other equipment (if any)"
          />
          <SelectField
            label="Assigned to"
            value={formData.assignedTo}
            onChange={handleInputChange}
            name="assignedTo"
            options={[
              { value: "", label: "" },
              ...staff.map((member) => ({
                value: member.name,
                label: member.name,
              })),
            ]}
          />
          <SelectField
            label="Today's List"
            value={formData.todaysList}
            onChange={handleInputChange}
            name="todaysList"
            options={[
              { value: "", label: "" },
              { value: "Yes", label: "Yes" },
              { value: "Done", label: "Done" },
            ]}
          />
          <SelectField
            label="Priority"
            value={formData.priority}
            onChange={handleInputChange}
            name="priority"
            options={[
              { value: "", label: "None" },
              ...Array.from({ length: 10 }, (_, i) => ({
                value: i + 1,
                label: `${i + 1}`,
              })),
            ]}
          />
          <div className="max-w-full">
            <label className="block mb-2 text-sm font-medium ">HHL Build</label>
            <div className="flex gap-x-3">
              {["Yes", "No", "Unknown"].map((value) => (
                <div key={value} className="flex space-x-0.5">
                  <input
                    type="radio"
                    name="hhlBuild"
                    value={value}
                    checked={formData.hhlBuild === value}
                    onChange={handleInputChange}
                  />
                  <label className="text-sm  ms-3">{value}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="max-w-full">
            <label className="block mb-2 text-sm font-medium">
              Chlorine Demand
            </label>
            <div className="flex gap-x-3">
              <input
                type="checkbox"
                name="chlorineDemand"
                checked={formData.chlorineDemand}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <div>
              <label className="block mb-2 text-sm font-medium ">
                Description
              </label>
              <div className=" border  rounded-lg p-2 " ref={quillRef} />
            </div>
          </div>
          <div className="sm:col-span-2">
            {existingImages.length > 0 && (
              <>
                <label className="block mb-2 text-sm font-medium ">
                  Existing Images
                </label>
                <div className="flex flex-wrap gap-4">
                  {existingImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="w-48 h-48 object-cover rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(image)}
                        className="absolute top-0 left-0  p-1 rounded-full opacity-85 group-hover:opacity-100 transition-opacity"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
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
              className=" border  rounded-lg"
            />
          </div>
          <div className="flex flex-cols-2 space-x-1">
            <button
              onClick={handleCancel}
              className="btn btn-error bg-red-500"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleEditPool}
              className="btn btn-success bg-green-500"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Edit;
