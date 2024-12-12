'use client';

import { useRouter } from "next/navigation";
import { KeyboardEvent } from 'react';
import Link from "next/link";
import Logo from "./logo";

export default function NavigationBar({ toggle }: { toggle: () => void }) { 

  const router = useRouter();

  const handleOnKeyDown = (e : KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push("/search?criteria=" + e.currentTarget.value);
      e.currentTarget.value = "";
    }
  }

return(
  <nav className="flex items-center justify-between p-3 pr-4 bg-black border-b-2 border-white shadow-[rgba(0,0,15,0.3)_0px_3px_4px_0px]">
     
    <div className="grid grid-cols-12 text-white w-full">
 
      <div className="lg:col-span-2 lg:grid-cols-2 md:col-span-4 md:grid-cols-4 col-span-12 grid-cols-12 grid pt-1 md:pt-0">
        <div className="col-span-10 grid-cols-10">
        <Logo/>
        </div>
        <div className="col-span-2 grid-cols-2 pt-1 md:pt-0">
          <button
            type="button"
            className="inline-flex items-center md:hidden"
            onClick={toggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="lg:col-span-7 lg:grid-cols-7 md:col-span-5 md:grid-cols-5 sm:col-span-6 sm:grid-cols-6 flex items-center justify-center h-full">
        <ul className="hidden md:flex gap-x-6 text-white ">
          <li>
            <Link href="/albums/album/add">
              <p>Albums</p>
            </Link>
          </li>
          <li>
            <Link href="/artists/artist/add">
              <p>Artists</p>
            </Link>
          </li>
          <li>
            <Link href="/members/member/add">
              <p>Members</p>
            </Link>
          </li>
          <li>
            <Link href="/lookups">
              <p>Lookups</p>
            </Link>
          </li>
        </ul>
      </div>

      <div className="lg:col-span-3 lg:grid-cols-3 md:col-span-3 md:grid-cols-3 sm:col-span-2 sm:grid-cols-2"> 
        {/* <div className="hidden md:block lg:pt-1 md:pt-1">                
          <div className="relative ml-3">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pt-2 md:pt-0 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input onKeyDown={handleOnKeyDown} type="search" id="default-search" className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
          </div>   
        </div> */}
      </div> 
    </div>
  </nav>     
)};