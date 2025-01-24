"use client";  

import { MdLocationCity } from "react-icons/md";
import { FaGlobeEurope } from "react-icons/fa";
import { PiVinylRecordFill } from "react-icons/pi";
import { LuFileAudio } from "react-icons/lu";
import { Tabs } from "flowbite-react";  
import  Lookup from "../lookups";
import { LookupTab } from "@/app/types/lookups";
import { MODE } from "@/app/lib/enums";
import { useState } from "react";
import Spinner from "@/app/components/spinner"; 

interface IProps {
  lookupTabs: LookupTab[];
}

export default function  LookupTabs({lookupTabs}: IProps) {   

  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const customTheme = 
  { 
    "tablist": {    
      "tabitem": {
        "base": "flex items-center justify-center p-4 text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400",
        "variant": {       
          "underline": {
            "base": "text-black bg-white",
            "active": {
              "on": "active text-slate-400 underline underline-offset-2",
              "off": "border-transparent text-black hover:text-slate-400"
            }
          },
        }
      }
    }   
  }  

  const getTabTitle = (mode: MODE) => {    
    switch(mode)
    {
      case MODE.BIRTHPLACE:
        return "Birth Place";
      case MODE.COUNTRY:
        return "Country";
      case MODE.RECORDLABEL:
        return "Record Label";
      case MODE.STUDIO:
        return "Studio";
    }
  }
 
  const getTabIcon = (mode: MODE) => {    
    switch(mode)
    {
      case MODE.BIRTHPLACE:
        return MdLocationCity;
      case MODE.COUNTRY:
        return FaGlobeEurope;
      case MODE.RECORDLABEL:
        return PiVinylRecordFill;
      case MODE.STUDIO:
        return LuFileAudio;
    }
  }
   
  return (    
    <> 
      <div className="flex flex-col w-full"> 
        <Spinner showSpinner={showSpinner}></Spinner>
          <Tabs className="" aria-label="Tabs with underline" variant="underline" theme={customTheme}>
            {lookupTabs.map((tab: LookupTab) => (  
              <Tabs.Item active title={getTabTitle(tab.mode)} key={tab.mode} icon={getTabIcon(tab.mode)}>
                <div className="font-medium text-black w-full h-full relative">                
                  <Lookup setShowSpinner={setShowSpinner} mode={tab.mode} items={tab.items}></Lookup>
                </div>
              </Tabs.Item>

            ))}
          </Tabs>
      </div>
    </>
  )
};