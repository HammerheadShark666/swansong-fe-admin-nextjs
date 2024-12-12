
export default async function AddAlbumPage() {      
   
  return  (
    // <div className="flex w-full justify-center flex-1 bg-neutral-700">
    //   <div className="w-full md:w-[90%] lg:w-[66%] py-1 px-4 bg-black mt-4 mb-4 flex h-screen flex-col"> 
    <>
      <div className="grid grid-cols-12">
        <span className="text-2xl text-white pt-2 mb-2 grid-cols-8 col-span-8">Add Album</span>
        {/* <div className="col-start-9 col-end-11">
          <button type="button" className="text-black py-2 px-6 text-sm bg-[#b68d40]  cursor-pointer 
                       text-center shadow-xs transition-all duration-500 hover:text-white mt-1">Add Album</button>
        </div> */}
        <div className="grid-cols-4 col-span-4 m-auto w-full flex  justify-end">
        <button type="button" className="text-black py-1.5 px-6 text-sm bg-[#b68d40]  cursor-pointer 
                       text-center shadow-xs transition-all duration-500 hover:text-white">Add Album</button>
        <button type="button"  className="text-black py-1.5 px-6 text-sm bg-[#b68d40] cursor-pointer 
                       text-center shadow-xs transition-all duration-500 hover:text-white ml-3">Search</button>
        </div>
      </div>
      
        <div className="grid grid-cols-12 w-full p-5 border border-gray-100 bg-white flex-1 mb-4">
          
        </div>        
    </>
        
    //   </div>
    // </div>
  )
};



// <div className="grid grid-cols-12 w-full md:grid-cols-12 md:w-[90%] lg:w-[66%] border-l-2 border-r-2 py-4 px-4"> 