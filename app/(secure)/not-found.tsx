'use client'

import Link from "next/link";
import { useSearchParams } from "next/navigation";
 
export default function NotFound() {  

  const searchParams = useSearchParams();
  const message = searchParams.get("message") || "Page Not Found";
  
  return ( 
    <div className="flex w-full justify-center h-full">
      <div className="w-full h-full text-white">         
         <div className="p-4 text-center w-full">
           <h2 className="text-2xl" >Not Found</h2>
         </div>
         <div className="p-4 text-center w-ful">
           <p>{message}</p>
         </div>
         <div className="p-4 text-center w-full">
           <Link href="/">Return Home</Link>
         </div>
      </div> 
    </div> 
)}