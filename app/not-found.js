import Link from "next/link";

export default function Page() {  
  return ( 
    <div className="flex w-full justify-center">
      <div className="grid grid-cols-1 md:grid-cols-12 w-[66%] border-l-2 border-r-2 py-4 px-4">
         
          <div className="p-4 grid-cols-1 text-center col-span-12 md:grid-cols-9">
            <h2 className="text-2xl" >Not Found</h2>
          </div>
          <div className="p-4 grid-cols-1 text-center col-span-12 md:grid-cols-9">
            <p>Could not find requested resource</p>
          </div>
          <div className="p-4 grid-cols-1 text-center col-span-12 md:grid-cols-9">
            <Link href="/">Return Home</Link>
          </div>
      </div>
    </div> 
)}