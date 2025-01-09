"use client";  
     
import { HiOutlineBookOpen, HiMusicNote, HiOutlineIdentification, HiOutlineCamera } from "react-icons/hi"; 
import { Tabs } from "flowbite-react";  
import AlbumDetailsForm from "./albumDetailsForm";
import { Album } from "@/app/types/album";
import { SelectItem } from "@/app/types/selectItem";
import AlbumPhotoForm from "./albumPhotoForm";
import AlbumSongs from "./albumSongs";
import AlbumDescriptionForm from "./albumDescriptionForm";
import { AlbumDescription } from "@/app/types/albumDescription";
import Spinner from "@/app/components/spinner";
import { useState } from "react";

interface IProps {
  album: Album;
  albumDescription: AlbumDescription;
  artistItems: SelectItem[];
  studioItems: SelectItem[];
  recordLabelItems: SelectItem[];
}

export default function  EditAlbumTabs({album, albumDescription, artistItems, studioItems, recordLabelItems}: IProps) {   

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
            <AlbumDetailsForm setShowSpinner={setShowSpinner} action="edit" existingData={album} artistItems={artistItems} studioItems={studioItems} recordLabelItems={recordLabelItems} />
          </div>
        </Tabs.Item>
        <Tabs.Item title="Photo" icon={HiOutlineCamera}>
          <div className="font-medium text-black">
            <AlbumPhotoForm id={album.id} filename={album.photo}></AlbumPhotoForm> 
          </div>
        </Tabs.Item>
        <Tabs.Item title="Songs" icon={HiMusicNote}>
          <div className="font-medium text-black">
            <AlbumSongs songs={album.songs} albumId={album.id}></AlbumSongs>
          </div>
        </Tabs.Item>
        <Tabs.Item title="Description" icon={HiOutlineBookOpen}>
          <div className="font-medium text-black">
            <AlbumDescriptionForm existingDescription={albumDescription}></AlbumDescriptionForm>
          </div>
        </Tabs.Item> 
      </Tabs>  
    </div>     
  )
};