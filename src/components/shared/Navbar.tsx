"use client";
import { UserIcon } from "@heroicons/react/16/solid";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import user from "../../../public/Assets/user.jpg";
import React, { useState } from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="bg-black text-white flex justify-between items-center">
      <div className="w-full flex-1 flex items-center justify-center shadow-md p-3">
        <div className="h-14 md:flex w-full justify-around ">
         
          <div className="flex justify-center items-center ">
          <Link href='/home'>
            <h1 className="flex text-4xl ">
              SILVERTECH
              <span className="ml-3 text-indigo-400">{`{Pulse}`}</span>
            </h1>
            </Link>
          </div>
          {/* <div className="flex w-[30%] justify-between items-center p-4 mr-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/bookmark" className="hover:underline">
              Bookmark
            </Link>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
            <Link href="/aboutus" className="hover:underline">
              About us
            </Link>
          </div> */}
          <div className="flex w-[40%] justify-around items-center p-4 mr-6">
            <div className="relative w-[50%] max-lg:hidden">
              <input
                type="text"
                className="p-2 border border-gray-300 text-black rounded w-full outline-none"
                placeholder="Search"
              />
              <button className="absolute right-0 top-0 mt-2 mr-2">
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35m2.85-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div>
            {status === "authenticated" ? (
              <div className="relative flex justify-around items-center w-[50%] ">
                <div>
                  <Link href="/write">
                  <button className="p-2 text-black rounded-lg border-4 border-blue-400 bg-slate-100">
                    Create Post
                  </button>
                  </Link>
                </div>
                <Image
                  src={session.user?.image || user}
                  alt="User"
                  width={70}
                  height={70}
                  className="w-12 h-12 rounded-full cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className="absolute top-12 right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2">
                    <Link
                      href="/profile"
                      // pass username instead of profile
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block px-4 py-2 text-left w-full hover:bg-gray-200"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="bg-indigo-500 text-white p-3 rounded hover:bg-indigo-600"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-indigo-500 text-white p-3 rounded hover:bg-indigo-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;