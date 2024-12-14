//import { createUrl } from "@/app/lib/http";
//import { RecordLabel } from "@/app/types/recordLabel";
import { Datepicker } from "flowbite-react";
//import { notFound } from "next/navigation";
import  SelectComponent  from "@/app/components/recordLabelSelect"



// async function getRecordLabels(): Promise<RecordLabel[]> {
 
//   const res = await fetch(createUrl('record-labels'), { cache: 'no-store' });
//   if (!res.ok) {
//     if(res.status == 404)
//       notFound(); 
//   }

  
//   return res.json();
// } 

export default async function AddAlbumPage() {      
   
  //const recordLabels = await getRecordLabels(); 

  // const results = SelectOption[]

  // recordLabels.forEach((value : RecordLabel) => {
  //   results.push({
  //     key: value.name,
  //     value: value.id,
  //   });
  // });




  return  (    
    <>
      <div className="grid grid-cols-12">
        <span className="grid-cols-6 col-span-6 text-2xl text-white pt-2 mb-2">Add Album</span>         
        
        <div className="grid-cols-6 col-span-6 m-auto w-full flex justify-end mt-1 mb-1">          
          <button className="text-black py-1.5 px-6 text-sm bg-[#b68d40]  cursor-pointer text-center shadow-xs transition-all duration-500 hover:text-white tooltip" data-tip={'Add Album'}>
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="20px" height="20px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"/></svg>
            </div>
          </button>
 
          <button type="button"  className="text-black py-1.5 px-6 text-sm bg-[#b68d40] cursor-pointer text-center shadow-xs transition-all duration-500 hover:text-white ml-3 tooltip" data-tip={'Search Albums'}>
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="20px" height="20px"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/></svg>
            </div>
          </button>
        </div> 
      </div>
 
      <div className="flex flex-col w-full border border-gray-100 bg-white flex-1 mb-2">
        <div className="w-full bg-neutral-950 h-1"></div>
         
        <div className="w-full grid grid-cols-12 bg-white flex-1 mb-4 mt-3">   
          <div className="grid-cols-12 col-span-12 md:grid-cols-7 md:col-span-7 mb-4 ml-3 mr-3 md:mb-0 shadow-md">
            <div className="w-full bg-neutral-700 text-white text-md pl-2">Details</div>

            <div className="w-full p-4">

              <form className="space-y-4 md:space-y-6 pb" action="#">

                <div className="grid grid-cols-12">
                  <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name*</label>
                  <input type="text" name="name" id="name" maxLength={120} className="grid-cols-12 col-span-12 md:grid-cols-10 md:col-span-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name of album" required />
                </div>

                <div className="grid grid-cols-12">
                  <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Artist*</label> 
                  
                 
                  
                  
                  <select id="countries" className="grid-cols-12 col-span-12 md:grid-cols-10 md:col-span-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    
 

                    <option value="">United States</option>
                    <option value="">Canada</option>
                    <option value="">France</option>
                    <option value="">Germany</option> 
                  </select> 
                </div>

                <div className="grid grid-cols-12">
                  <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Release Date</label> 
                  <Datepicker id="release-date" className="grid-cols-12 col-span-12 md:grid-cols-4 md:col-span-4" />
                </div>

                <div className="grid grid-cols-12">
                  <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recorded Date</label> 
                  <Datepicker id="recorded-date" className="grid-cols-12 col-span-12 md:grid-cols-4 md:col-span-4" />
                </div>

                <div className="grid grid-cols-12">
                  <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Record Label</label> 
                  <SelectComponent />
                  {/* <select id="record-labels" className="grid-cols-12 col-span-12 md:grid-cols-10 md:col-span-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>France</option>
                    <option>Germany</option>
                  </select>  */}
                </div>

                <div className="grid grid-cols-12">
                  <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Studio</label> 
                  <select id="studio" className="grid-cols-12 col-span-12 md:grid-cols-10 md:col-span-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>France</option>
                    <option>Germany</option>
                  </select> 
                </div>

                <div className="grid grid-cols-12">
                  <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Producers</label>
                  <input type="text" name="producers" id="producers" maxLength={250}  className="grid-cols-12 col-span-12 md:grid-cols-10 md:col-span-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="producers"/>
                </div>

                <div className="grid grid-cols-12">
                  <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Arrangers</label>
                  <input type="text" name="arrangers" id="arrangers" maxLength={250}  className="grid-cols-12 col-span-12 md:grid-cols-10 md:col-span-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="arrangers"/>
                </div>

                <div className="grid grid-cols-12">
                  <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Artwork</label>
                  <input type="text" name="artwork" id="artwork" maxLength={100}  className="grid-cols-12 col-span-12 md:grid-cols-10 md:col-span-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="artwork"/>
                </div>
 
              </form> 
            </div>       

          </div>   




          <div className="grid grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 flex-1 ml-3 mr-3 md:mb-0">

            <div className="w-full grid grid-cols-12 col-span-12 bg-white flex-1">   
              <div className="grid-cols-12 col-span-12 flex-1 shadow-md">
                <div className="w-full bg-neutral-700 text-white text-md pl-2">Photo</div>
                <div className=""> </div>
              </div>       
              <div className="grid-cols-12 col-span-12 flex-1 shadow-md mt-5">
                <div className="w-full bg-neutral-700 text-white text-md pl-2">Tracks</div>
                <div className=""> </div>
              </div>
            </div>     

          </div>
        </div>    

      </div>
             
    </> 
  )
};

//sm:w-full md:w-8/12
//sm:w-full md:w-4/12

// <div className="flex flex-col w-full border border-gray-100 bg-white flex-1 mb-2">
// <div className="grid-cols-12 col-span-12 w-full bg-neutral-950 h-1"></div>

// <div className="grid grid-cols-12 w-full border border-gray-100 bg-white flex-1 mb-4 mt-3">   
//   <div className="grid-cols-7 col-span-7 bg-slate-500 ml-3 mr-3"></div>       
//   <div className="grid-cols-5 col-span-5 bg-slate-500 mr-3"></div>
// </div>

// </div>
