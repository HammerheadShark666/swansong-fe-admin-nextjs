import { getArtistLookups } from "@/app/artists/actions/lookups"; 
import PageNavigationBar from "@/app/components/navigation/pageNavBar";
import { Metadata } from "next";
import AddArtistTabs from "@/app/artists/components/tabs/addArtistTabs";
import { ACTION, MODE } from "@/app/lib/enums";

export const metadata: Metadata = {
  title: "Swansong - Add Artist",
  description: "Swansong music admin site"
}

export default async function AddArtistPage() {  
 
  const lookups = await getArtistLookups();  
 
  return  (    
    <>    
      <PageNavigationBar action={ACTION.ADD} mode={MODE.ARTIST}></PageNavigationBar>
      <div className="flex flex-col w-full border-gray-100 bg-white flex-1 p-4 mb-4">
        <AddArtistTabs countryItems={lookups.countries}></AddArtistTabs> 
      </div>
    </> 
  )
};