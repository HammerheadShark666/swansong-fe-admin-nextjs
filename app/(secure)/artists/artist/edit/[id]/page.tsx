import { getArtist } from "@/app/(secure)/artists/actions/artist";
import { getArtistLookupsForm } from "@/app/(secure)/artists/actions/lookups"; 
import EditArtistTabs from "@/app/(secure)/artists/components/tabs/editArtistTabs";
import PageNavigationBar from "@/app/components/navigation/pageNavigationBar"; 
import { ACTION, MODE } from "@/app/lib/enums";
import { Artist } from "@/app/types/artist/artist";
import { ArtistDescription } from "@/app/types/artist/artistDescription";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swansong - Edit Artist",
  description: "Swansong music admin site"
}

export default async function EditArtistPage({ params }:{ params: Promise<{ id: string }> } ) {      
  
  const {id} = await params; 
  const artist = await getArtist(Number(id)); 
  const artistDescription = getArtistDescription(artist);
  const lookups = await getArtistLookupsForm();  

  function getArtistDescription(artist: Artist){
    const artistDescription: ArtistDescription = {
      id: artist.id,
      description: artist.description
    }
    return artistDescription;
  }
 
  return  (    
    <>
      <PageNavigationBar action={ACTION.EDIT} mode={MODE.ARTIST}></PageNavigationBar>   
      <div className="flex flex-row h-full flex-1 w-full border-gray-100 bg-white pl-4 pr-4 mb-4">      
        <EditArtistTabs artist={artist} artistDescription={artistDescription} countryItems={lookups.countries}></EditArtistTabs> 
      </div>      
    </> 
  )}; 