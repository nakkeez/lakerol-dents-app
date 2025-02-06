"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiFilter, BiSearch, BiLogOut } from "react-icons/bi";

/**
 * Component for displaying navigation bar with expandable menu.
 *
 * @returns Navigation bar component
 */
export default function Navbar(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  const navList = [
    {
      icon: <BiSearch className="text-2xl" />,
      title: "Search",
      endpoint: "/",
    },
    {
      icon: <BiFilter className="text-2xl" />,
      title: "Filfter",
      endpoint: "/filter",
    },
    {
      icon: <BiLogOut className="text-2xl" />,
      title: "Logout",
      endpoint: "/api/auth/signout",
    },
  ];

  useEffect(() => {
    // Redirect user to login page if not authenticated or
    // there's an error while refreshing access token
    if (!session || session.error) {
      signOut();
    }
  }, [session]);

  return (
    <nav className="flex w-full items-center bg-gray-600 px-8 py-6 text-gray-100 border-b-2 border-gray-300 z-10">
      <div className="flex items-center">
        <button
          className="mr-5 p-1 border-2 hover:bg-gray-300 hover:text-gray-900 border-slate-500 rounded-lg hover:border-slate-700"
          aria-label="Open navigation menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <GiHamburgerMenu className="text-3xl" />
        </button>

        <h1 className="text-xl md:text-2xl font-extrabold">
          Läkeröl Dents App
        </h1>
      </div>

      {isOpen && (
        <div className="z-10 fixed inset-0 transition-opacity">
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black opacity-50"
            tabIndex={0}
          ></div>
        </div>
      )}

      <aside
        className={`transform text-gray-700 dark:text-gray-200 top-0 left-0 w-72 bg-white dark:bg-slate-900 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <span className="flex w-full items-center p-4 border-b-2">
          <h2 className="text-xl font-extrabold mx-auto">Läkeröl Dents App</h2>
        </span>

        {navList.map(({ icon, title, endpoint }, index) => {
          return (
            <Link
              key={index}
              href={endpoint}
              onClick={() => setIsOpen(false)}
              className="flex items-center p-4 font-bold hover:bg-blue-500 hover:text-white"
            >
              <span className="mr-2">{icon}</span> <span>{title}</span>
            </Link>
          );
        })}
      </aside>
    </nav>
  );
}
