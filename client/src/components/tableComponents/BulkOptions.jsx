import React from "react";

const BulkOptions = ({
  staff,
  bulkStatus,
  bulkAssignedTo,
  bulkTodaysList,
  bulkPriority,
  onStatusChange,
  onAssignedToChange,
  onTodaysListChange,
  onPriorityChange,
  onBulkUpdate,
}) => (
  <div className="flex justify-center items-center space-x-4 mb-4">
    <div>
      <label className="block text-sm font-medium leading-6  ">
        Update status
      </label>
      <select
        className="relative w-full cursor-default rounded-md   py-1.5 pl-3  text-left  shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        value={bulkStatus}
        onChange={onStatusChange}
      >
        <option value=""></option>
        <option value=" ">None</option>
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
    <div>
      <label className="block text-sm font-medium leading-6  ">
        Assign to staff
      </label>
      <select
        className="relative w-full cursor-default rounded-md    py-1.5 pl-3 text-left  shadow-sm ring-1 ring-inset  focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        value={bulkAssignedTo}
        onChange={onAssignedToChange}
      >
        <option value=""></option>
        {staff.map((member) => (
          <option key={member._id} value={member.name}>
            {member.name}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium leading-6  ">
        Update today's list
      </label>
      <select
        className="relative w-full cursor-default rounded-md    py-1.5 pl-3 text-left  shadow-sm ring-1 ring-inset  focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        value={bulkTodaysList}
        onChange={onTodaysListChange}
      >
        <option value=""></option>
        <option value=" ">None</option>
        <option value="Yes">Yes</option>
        <option value="Done">Done</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium leading-6  ">
        Update priority
      </label>
      <select
        className="relative w-full cursor-default rounded-md    py-1.5 pl-3 text-left  shadow-sm ring-1 ring-inset  focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        value={bulkPriority}
        onChange={onPriorityChange}
      >
        <option value=""></option>
        <option value=" ">None</option>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
    <button
      onClick={onBulkUpdate}
      className="px-2 py-2 bg-blue-500 text-white rounded-lg text-sm mt-5 hover:bg-blue-700 active:bg-blue-900"
    >
      Update
    </button>
  </div>
);

export default BulkOptions;
