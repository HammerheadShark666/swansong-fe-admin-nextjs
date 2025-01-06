'use client'

import Link from "next/link";
import React, { useState } from "react";

interface IProps {
  label: "Album" | "Artist"; 
}

export default function AlbumSearchDrawer({label}: IProps) { 

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);

  

  return (
    <>
      {/* Main Button to Open Drawer */}

      <Link href=""  onClick={toggleDrawer} className="text-black py-1.5 px-4 text-sm bg-[#b68d40] cursor-pointer text-center shadow-xs transition-all duration-500 hover:text-white ml-3 tooltip" data-tip={'Search ' + label +'s'}>
        <div className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="27px" height="27px"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/></svg>
        </div>
      </Link>

      {/* <button
        onClick={toggleDrawer}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Open Drawer
      </button> */}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-40`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Drawer</h2>
          <button
            onClick={toggleDrawer}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </div>
        <div className="p-4">
          <p>Drawer Content Here</p>
        </div>
      </div>

      {/* Overlay (Optional) */}
      {isOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
        ></div>
      )}
    </>
  );
};