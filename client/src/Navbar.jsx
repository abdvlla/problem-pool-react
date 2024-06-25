import React, { useState, useCallback, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const navigate = useNavigate();

  const logout = useCallback(() => {
    onLogout();
    navigate("/auth");
  }, [onLogout, navigate]);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  if (!isLoggedIn) return null;

  return (
    <header className="top-0 z-50 sticky border-solid border-2 dark:border-gray-600 dark:border-t-0 dark:border-x-0 bg-gray-50 dark:bg-neutral-900 dark:bg-opacity-95 bg-opacity-95">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="hidden lg:flex lg:flex-1">
          <NavLink to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">HHL Home</span>
            <img
              className="h-8 w-auto"
              src="https://poolsuppliesnovascotia.pro/cdn/shop/files/Logo_e26ade37-5699-44c7-831e-4e21036feb4e.jpg?v=1711477056&width=300"
              alt="Logo"
            />
          </NavLink>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-800 dark:text-gray-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <NavLink
            to="/pools"
            className="text-sm font-semibold leading-6 text-gray-800 hover:text-neutral-950 dark:hover:text-gray-50 dark:text-gray-200"
          >
            BoW
          </NavLink>
          <NavLink
            to="/pools/new"
            className="text-sm font-semibold leading-6 text-gray-800 hover:text-neutral-950 dark:hover:text-gray-50 dark:text-gray-200"
          >
            New BoW
          </NavLink>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
          <button
            className="text-sm font-semibold leading-6 text-gray-800 hover:text-neutral-950 dark:hover:text-gray-50 dark:text-gray-200"
            onClick={logout}
          >
            Log out
          </button>
        </div>
        <DarkModeSwitch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="ml-8"
          aria-hidden="true"
        />
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-50 dark:bg-neutral-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-300 dark:sm:ring-gray-700">
          <div className="flex items-center justify-between">
            <NavLink
              to="/"
              className="-m-1.5 p-1.5 block rounded-lg py-2 text-base dark:text-white font-semibold leading-7"
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-800 dark:text-gray-200"
              onClick={closeMobileMenu}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flow-root">
            <div className="-my-6 divide-y divide-gray-900 dark:divide-gray-700">
              <div className="py-6">
                <NavLink
                  to="/pools"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={closeMobileMenu}
                >
                  BoW
                </NavLink>
                <NavLink
                  to="/pools/new"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={closeMobileMenu}
                >
                  New BoW
                </NavLink>
              </div>
              <div className="py-6">
                <button
                  className="-mx-3 block w-full rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 text-left"
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;
