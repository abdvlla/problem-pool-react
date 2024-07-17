import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";

const OptionsDropdown = ({ poolId }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="btn-xs btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-8 stroke-current "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[50px] dark:bg-white space-y-2 bg-neutral-600 rounded-md p-3 text-center shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          sideOffset={5}
        >
          <DropdownMenu.Item className="group flex items-center h-5 px-3 rounded-md text-sm text-gray-50 dark:text-black hover:bg-gray-500 dark:hover:bg-gray-400 focus:outline-none">
            <Link to={`/pools/${poolId}`} className="w-full h-full">
              View
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="group flex items-center h-5 px-2 rounded-md text-sm text-gray-50 dark:text-black hover:bg-gray-500 dark:hover:bg-gray-400 focus:outline-none">
            <Link to={`/pools/${poolId}/edit`} className="w-full h-full">
              Edit
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default OptionsDropdown;
