import PageNavigationBar from "@/app/components/navigation/pageNavigationBar";
import { Metadata } from "next";
import AddArtistTabs from "@/app/artists/components/tabs/addArtistTabs";
import { ACTION, MODE } from "@/app/lib/enums";
import { getArtistLookupsForm } from "../../actions/lookups";  

export const metadata: Metadata = {
  title: "Swansong - Add Artist",
  description: "Swansong music admin site"
}

export default async function AddArtistPage() {  
 
  const lookups = await getArtistLookupsForm();  
 
  return  (    
    <>    
      <PageNavigationBar action={ACTION.ADD} mode={MODE.ARTIST}></PageNavigationBar>
      <div className="flex flex-col w-full border-gray-100 bg-white h-full flex-1 pl-4 pr-4">  
        <AddArtistTabs countryItems={lookups.countries}></AddArtistTabs>
      </div>
    </> 
  )
};