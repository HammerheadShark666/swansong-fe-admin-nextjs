import { getAlbumLookups } from "@/app/(secure)/albums/actions/lookups"; 
import PageNavigationBar from "@/app/components/navigation/pageNavigationBar";
import { Metadata } from "next";
import AddAlbumTabs from "@/app/(secure)/albums/components/tabs/addAlbumTabs";
import { ACTION, MODE } from "@/app/lib/enums";

export const metadata: Metadata = {
  title: "Swansong - Add Album",
  description: "Swansong music admin site"
}

export default async function AddAlbumPage() {  
 
  const lookups = await getAlbumLookups();
 
  return  (    
    <>    
      <PageNavigationBar action={ACTION.ADD} mode={MODE.ALBUM}></PageNavigationBar> 
      <div className="flex flex-col w-full border-gray-100 bg-white h-full flex-1 pl-4 pr-4">
        <AddAlbumTabs artistItems={lookups.artists} studioItems={lookups.studios} recordLabelItems={lookups.recordLabels}></AddAlbumTabs> 
      </div> 
    </> 
  )
};