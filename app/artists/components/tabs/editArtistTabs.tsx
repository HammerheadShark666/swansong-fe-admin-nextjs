"use client";  
     
import { HiOutlineBookOpen, HiMusicNote, HiOutlineIdentification, HiOutlineCamera, HiOutlineMusicNote } from "react-icons/hi"; 
import { Tabs } from "flowbite-react";  
import ArtistDetailsForm from "@/app/artists/components/artistDetailsForm";
import { Artist } from "@/app/types/artist/artist";
import { SelectItem } from "@/app/types/selectItem";
import ArtistPhotoForm from "@/app/artists/components/artistPhotoForm";
import ArtistMembers from "@/app/artists/components/artistMembers";
import ArtistDescriptionForm from "@/app/artists/components/artistDescriptionForm";
import { ArtistDescription } from "@/app/types/artist/artistDescription";
import Spinner from "@/app/components/spinner";
import { useState } from "react";
import { ACTION } from "@/app/lib/enums";
import ArtistAlbums from "../artistAlbums";

interface IProps {
  artist: Artist;
  artistDescription: ArtistDescription;
  countryItems: SelectItem[];
}

export default function  EditArtistTabs({artist, artistDescription, countryItems}: IProps) {   

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
            <ArtistDetailsForm setShowSpinner={setShowSpinner} action={ACTION.EDIT} artistData={artist} countryItems={countryItems} />
          </div>
        </Tabs.Item>
        <Tabs.Item title="Photo" icon={HiOutlineCamera}>
          <div className="font-medium text-black">
            <ArtistPhotoForm setShowSpinner={setShowSpinner} id={artist.id} filename={artist.photo}></ArtistPhotoForm> 
          </div>
        </Tabs.Item>
        <Tabs.Item title="Member" icon={HiMusicNote}>
          <div className="font-medium text-black">
            <ArtistMembers setShowSpinner={setShowSpinner} members={artist.members} artistId={artist.id}></ArtistMembers>
          </div>
        </Tabs.Item>
        <Tabs.Item title="Description" icon={HiOutlineBookOpen}>
          <div className="font-medium text-black">
            <ArtistDescriptionForm setShowSpinner={setShowSpinner} artistDescription={artistDescription}></ArtistDescriptionForm>
          </div>
        </Tabs.Item> 
        <Tabs.Item title="Albums" icon={HiOutlineMusicNote}>
          <div className="font-medium text-black">
            <ArtistAlbums albums={artist.albums}></ArtistAlbums>
          </div>
        </Tabs.Item> 
      </Tabs>  
    </div>     
  )
};