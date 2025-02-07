import { Metadata } from "next";
import LookupTabs from "@/app/(secure)/lookups/components/tabs/lookupTabs";
import { getLookups } from "./actions/lookups";
import { isLookups, Lookups, LookupTab } from "../../types/lookups";
import { MODE } from "../../lib/enums";

export const metadata: Metadata = {
  title: "Swansong - Lookups",
  description: "Swansong music admin site"
}

export default async function LookupPage() {   

  const lookupTabs: LookupTab[] = [];

  function createTabsArray(lookups: Lookups) 
  { 
    lookupTabs.push({mode: MODE.BIRTHPLACE, items: lookups.birthPlaces});
    lookupTabs.push({mode: MODE.COUNTRY, items: lookups.countries});
    lookupTabs.push({mode: MODE.RECORDLABEL, items: lookups.recordLabels});
    lookupTabs.push({mode: MODE.STUDIO, items: lookups.studios});
    return lookupTabs;
  }  

  const response = await getLookups();  
  if(isLookups(response))
  { 
    return  (    
      <>
        <div className="flex flex-col w-full border-gray-100 bg-white h-full flex-1 pl-4 pr-4">  
          <LookupTabs lookupTabs={createTabsArray(response)}></LookupTabs>
        </div>
      </> 
    )
  } 
  else
  {
    <div className="flex flex-col w-full border-gray-100 bg-white h-full flex-1 pl-4 pr-4">  
      <h1>The has been an issue loading lookups data.</h1>
    </div>
  }
};