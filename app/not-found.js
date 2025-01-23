import Link from "next/link";

export default function Page() {  
  return ( 
    <div className="flex w-full justify-center h-full">
      <div className="w-full h-full">
         
         <div className="p-4 text-center w-full text-white">
           <h2 className="text-2xl" >Not Found</h2>
         </div>
         <div className="p-4 text-center w-full text-white">
           <p>Could not find requested resource</p>
         </div>
         <div className="p-4 text-center w-full text-white">
           <Link href="/">Return Home</Link>
         </div>
     </div>


      {/* <div className="grid grid-cols-1 md:grid-cols-12 w-[66%] border-l-2 border-r-2 py-4 px-4">
         
          <div className="p-4 grid-cols-1 text-center col-span-12 md:grid-cols-9 text-white">
            <h2 className="text-2xl" >Not Found</h2>
          </div>
          <div className="p-4 grid-cols-1 text-center col-span-12 md:grid-cols-9 text-white">
            <p>Could not find requested resource</p>
          </div>
          <div className="p-4 grid-cols-1 text-center col-span-12 md:grid-cols-9 text-white">
            <Link href="/">Return Home</Link>
          </div>
      </div> */}
    </div> 
)}