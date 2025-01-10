import { getAlbumLookups } from "@/app/albums/actions/lookups"; 
import PageNavigationBar from "@/app/components/navigation/pageNavBar";
import { Metadata } from "next";
import AddAlbumTabs from "@/app/albums/components/tabs/addAlbumTabs";

export const metadata: Metadata = {
  title: "Swansong - Add Album",
  description: "Swansong music admin site"
}

export default async function AddAlbumPage() {  
 
  const lookups = await getAlbumLookups(); 
 
  return  (    
    <>    
      <PageNavigationBar action="add" mode="album" addUrl="/albums/album/add"></PageNavigationBar>
      <div className="flex flex-col w-full border-gray-100 bg-white flex-1 p-4 mb-4">
        <AddAlbumTabs artistItems={lookups.artists} studioItems={lookups.studios} recordLabelItems={lookups.recordLabels}></AddAlbumTabs> 
      </div>
    </> 
  )
};