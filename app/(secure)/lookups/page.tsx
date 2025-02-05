import { Metadata } from "next";
import LookupTabs from "@/app/(secure)/lookups/components/tabs/lookupTabs";
import { getLookups } from "./actions/lookups";
import { LookupTab } from "../../types/lookups";
import { MODE } from "../../lib/enums";

export const metadata: Metadata = {
  title: "Swansong - Lookups",
  description: "Swansong music admin site"
}

export default async function LookupPage() {   

  const lookups = await getLookups();  

  const lookupTabs: LookupTab[] = [];
 
  function createTabsArray() 
  { 
    lookupTabs.push({mode: MODE.BIRTHPLACE, items: lookups.birthPlaces});
    lookupTabs.push({mode: MODE.COUNTRY, items: lookups.countries});
    lookupTabs.push({mode: MODE.RECORDLABEL, items: lookups.recordLabels});
    lookupTabs.push({mode: MODE.STUDIO, items: lookups.studios});

    return lookupTabs;
  }  

  return  (    
    <>
      <div className="flex flex-col w-full border-gray-100 bg-white h-full flex-1 pl-4 pr-4">  
        <LookupTabs lookupTabs={createTabsArray()}></LookupTabs>
      </div>
    </> 
  )
};