import React, { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("guest_session_id") !== null;
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("guest_session_id");
    navigate("/auth");
  };

  return (
    <header className="top-0 z-50 sticky ">
      <nav
        className="flex items-center justify-between px-6 py-1 mb-6 lg:px-8 mx-auto max-w-6xl"
        aria-label="Global"
      >
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-800"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <NavLink
            to="/"
            className="text-sm font-semibold leading-6 text-gray-800"
          >
            Home
          </NavLink>
          <NavLink
            to="/pools"
            className="text-sm font-semibold leading-6 text-gray-800"
          >
            BoW
          </NavLink>
          <NavLink
            to="/pools/new"
            className="text-sm font-semibold leading-6 text-gray-800"
          >
            New BoW
          </NavLink>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn ? (
            <button
              className="text-md font-semibold leading-6 text-gray-800"
              onClick={logout}
            >
              Log out
            </button>
          ) : (
            <NavLink
              to="/auth"
              className="text-sm font-semibold leading-6 text-gray-800"
            >
              Log in
            </NavLink>
          )}
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-movieDark px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-50">
          <div className="flex items-center justify-between">
            <NavLink
              to="/"
              className="-m-1.5 p-1.5 block rounded-lg py-2 text-base font-semibold leading-7"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
              <span className="sr-only">Your Company</span>
            </NavLink>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flow-root">
            <div className="-my-6 divide-y divide-gray-50">
              <div className="space-y-2 py-6">
                <NavLink
                  to="/pools"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pools
                </NavLink>
              </div>
              <div className="py-6">
                {isLoggedIn ? (
                  <button
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Log out
                  </button>
                ) : (
                  <NavLink
                    to="/auth"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;
