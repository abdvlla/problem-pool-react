import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Staff = () => {
  const token = localStorage.getItem("token");
  const [staff, setStaff] = useState([]);
  const [name, setName] = useState("");
  const [editName, setEditName] = useState({});
  const [editMode, setEditMode] = useState({});

  useEffect(() => {
    fetchStaff();
  }, [token]);

  const fetchStaff = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/employees`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStaff(response.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  const handleAddStaff = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/employees`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStaff([...staff, response.data]);
      setName("");
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Staff successfully added.",
        width: 500,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Staff not added.",
        width: 500,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  const handleDeleteStaff = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/employees/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setStaff(staff.filter((member) => member._id !== id));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Staff successfully deleted.",
            width: 500,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "Failed to delete staff.",
            width: 500,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        }
      }
    });
  };

  const handleEditStaff = async (id, updatedName) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save the changes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/employees/${id}`,
            { name: updatedName },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setStaff(
            staff.map((member) =>
              member._id === id
                ? { ...member, name: response.data.name }
                : member
            )
          );
          setEditMode((prev) => ({ ...prev, [id]: false }));
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Staff successfully updated.",
            width: 500,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "Failed to update staff.",
            width: 500,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        }
      }
    });
  };

  const toggleEditMode = (id) => {
    setEditMode((prev) => ({ ...prev, [id]: !prev[id] }));
    setEditName((prev) => ({
      ...prev,
      [id]: staff.find((m) => m._id === id)?.name || "",
    }));
  };

  const handleCancelEdit = (id) => {
    setEditMode((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="container mx-auto p-4 max-w-xl py-8 mt-8 rounded-lg shadow-lg shadow-gray-500  ">
      <h2 className="text-2xl font-bold mb-4 ">Manage Staff</h2>
      <div className="grid mx-auto max-w-xl mb-4">
        <input
          type="text"
          placeholder="Name of staff"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=" border border-gray-300   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        />
        <button
          onClick={handleAddStaff}
          className="btn btn-sm btn-primary mx-auto my-2"
        >
          Add staff
        </button>
      </div>
      <ul className="space-y-2">
        {staff.map((member) => (
          <li
            key={member._id}
            className="p-2 border  rounded-lg flex items-center justify-between shadow-sm hover:shadow-lg transition-shadow duration-200 "
          >
            <div className="flex items-center">
              {!editMode[member._id] ? (
                <span className="mr-2">{member.name}</span>
              ) : (
                <input
                  type="text"
                  value={editName[member._id]}
                  onChange={(e) =>
                    setEditName({ ...editName, [member._id]: e.target.value })
                  }
                  className=" border border-gray-300   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2"
                />
              )}
            </div>
            <div className="flex items-center space-x-2">
              {!editMode[member._id] ? (
                <>
                  <button
                    onClick={() => toggleEditMode(member._id)}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteStaff(member._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() =>
                      handleEditStaff(member._id, editName[member._id])
                    }
                    className="btn btn-sm btn-success"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleCancelEdit(member._id)}
                    className="btn btn-sm btn-error"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Staff;
