'use client';

import Link from "next/link";
import Logo from "./logo";
import { useRouter } from "next/navigation";
import { KeyboardEvent } from 'react'; 
import { FE_SEARCH } from "@/app/lib/urls";
import Logout from "./logout";

export default function NavigationBar({ toggle }: { toggle: () => void }) { 

  const router = useRouter();
  
  const handleOnKeyDown = (e : KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(FE_SEARCH + e.currentTarget.value);
      e.currentTarget.value = ""; 
    }
  }

return (

  <nav className="flex flex-row items-center p-0 pr-4 bg-black border-b-2 border-white shadow-[rgba(0,0,15,0.3)_0px_3px_4px_0px]">
         
    <div className="flex w-2/6 lg:w-1/6">
      <Logo/>
    </div>

    <div className="flex w-3/6 lg:w-4/6 justify-center">
      <ul className="hidden md:flex gap-x-6 text-white">
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

    <div className="flex w-1/6">  
      <input onKeyDown={handleOnKeyDown} type="search" id="default-search" className="hidden md:block w-full p-3 ps-2 text-sm" placeholder="Search..." required />
    </div>  

    <div className="hidden md:flex w-1/6 justify-end">
      <Logout></Logout>
    </div>

    <div className="flex flex-row w-1/6 md:hidden">         
      <button
        type="button"
        className="inline-flex items-center md:hidden h-full bg-black"
        onClick={toggle}
      >
        <svg
          className=""
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="45"
          viewBox="0 0 24 21"
        >
          <path
            fill="#fff"
            d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
          />
        </svg>
      </button>
     </div>  
  </nav> 
)};