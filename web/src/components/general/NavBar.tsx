/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import logo from "../../logos/Logo.svg";
import title from "../../logos/Title.svg";
import { FaUser } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FiLogOut, FiLogIn } from "react-icons/fi";
const navigation = [{ name: "Home", href: "/", current: true }];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    // storing input name
    var temp = window.localStorage.getItem("uid");
    setUser(temp);
  }, [user]);

  return (
    <Disclosure as="nav" className=" bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="max-w-9xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    onClick={() => navigate("/")}
                    className="block lg:hidden h-8 w-auto"
                    src={logo}
                    alt="Workflow"
                  />
                  <img
                    onClick={() => navigate("/")}
                    className="block lg:hidden h-8 w-auto"
                    src={title}
                    alt="Workflow"
                  />
                  <img
                    onClick={() => navigate("/")}
                    className="hidden lg:block h-8 w-auto"
                    src={logo}
                    alt="Workflow"
                  />
                  <img
                    onClick={() => navigate("/")}
                    className="hidden lg:block h-8 w-auto"
                    src={title}
                    alt="Workflow"
                  />
                </div>
                <div className="hidden md:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? " text-violet-900 "
                            : "text-gray-500 brightness-75  hover:bg-violet-50",
                          "px-3 py-2 rounded-md text-lg font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <button
                  className={classNames(
                    user !== undefined && user !== null
                      ? "text-gray-300 h-7 w-auto"
                      : "hidden"
                  )}
                  onClick={() => {
                    window.localStorage.clear();
                    navigate("/");
                  }}
                >
                  <FiLogOut
                    className={classNames(
                      user !== undefined && user !== null
                        ? "text-gray-500 h-7 w-auto"
                        : "hidden"
                    )}
                  />
                </button>
                <button
                  className={classNames(
                    user === undefined || user === null
                      ? "text-gray-500  h-7 w-auto"
                      : "hidden"
                  )}
                  onClick={() => {
                    window.localStorage.clear();
                    navigate("/login");
                  }}
                >
                  <FiLogIn
                    className={classNames(
                      user === undefined || user === null
                        ? "text-gray-500  h-7 w-auto"
                        : "hidden"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-100 text-gray-700"
                      : "text-gray-700  hover:text-violet-700",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
