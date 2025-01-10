"use client";  
     
import { HiOutlineIdentification } from "react-icons/hi";
import { Tabs } from "flowbite-react";  
import AlbumDetailsForm from "./albumDetailsForm";
import { SelectItem } from "@/app/types/selectItem"; 
import Spinner from "@/app/components/spinner";
import { useState } from "react";

interface IProps {
  artistItems: SelectItem[];
  studioItems: SelectItem[];
  recordLabelItems: SelectItem[];
}

export default function  AddAlbumTabs({artistItems, studioItems, recordLabelItems}: IProps) {   

  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const customTheme = 
  { 
    "tablist": {    
      "tabitem": {
        "base": "flex items-center justify-center p-4 text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
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

  return (  
    <div className="relative">
      <Spinner showSpinner={showSpinner}></Spinner>
      <Tabs aria-label="Tabs with underline" variant="underline" theme={customTheme}>
        <Tabs.Item active title="Details" icon={HiOutlineIdentification}>
          <div className="font-medium text-black w-full relative">
            <AlbumDetailsForm setShowSpinner={setShowSpinner} action="add" artistItems={artistItems} studioItems={studioItems} recordLabelItems={recordLabelItems} />
          </div>
        </Tabs.Item> 
      </Tabs>  
    </div>     
  )
};