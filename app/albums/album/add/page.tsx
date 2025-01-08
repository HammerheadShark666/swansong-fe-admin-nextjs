import AlbumDetailsForm from "@/app/albums/components/albumDetailsForm"; 
import { getAlbumLookups } from "../../actions/getSelectLookups"; 
import PageNavigationBar from "@/app/components/navigation/pageNavBar";

export default async function AddAlbumPage() {  

  const lookups = await getAlbumLookups();

  return  (    
    <>
    
      <PageNavigationBar action="add" mode="album" addUrl="/albums/album/add"></PageNavigationBar>
 
      <div className="flex flex-col w-full border border-gray-100 bg-white flex-1 mb-2">
        <div className="w-full bg-neutral-950 h-1"></div>
         
        <div className="w-full grid grid-cols-12 bg-white flex-1 mb-4 mt-3">   
          
          <div className="grid-cols-12 col-span-12 mb-4 ml-3 mr-3 md:mb-0 shadow-md">
            <div className="w-full bg-neutral-700 text-white text-md pl-2">Details</div>
            <div className="w-full p-4">
              <AlbumDetailsForm action="add" artistItems={lookups.artists} studioItems={lookups.studios} recordLabelItems={lookups.recordLabels}  />
            </div>       
          </div>   
        </div>    
      </div>             
    </> 
  )
};