import { getArtist } from "@/app/(secure)/artists/actions/artist";
import { getArtistLookups } from "@/app/(secure)/artists/actions/lookups"; 
import EditArtistTabs from "@/app/(secure)/artists/components/tabs/editArtistTabs";
import Messages from "@/app/components/controls/messages";
import PageNavigationBar from "@/app/components/navigation/pageNavigationBar"; 
import { ACTION, MODE } from "@/app/lib/enums";
import { Artist, isArtist } from "@/app/types/artist/artist";
import { ArtistDescription } from "@/app/types/artist/artistDescription";
import { ArtistLookups, isArtistLookups } from "@/app/types/artist/artistLookups";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swansong - Edit Artist",
  description: "Swansong music admin site"
}

export default async function EditArtistPage({ params }:{ params: Promise<{ id: string }> } ) {      
  
    let artist: Artist;
    let artistDescription: ArtistDescription;
    let lookups: ArtistLookups;
    const {id} = await params;   
     
    function getArtistDescription(artist: Artist){
      const artistDescription: ArtistDescription = {
        id: artist.id,
        description: artist.description
      }
      return artistDescription;
    }
    
    const artistResponse = await getArtist(Number(id)); 
    if(isArtist(artistResponse)) 
    {
      artist = artistResponse;
      artistDescription = getArtistDescription(artist);
     
      const artistLookupsResponse = await getArtistLookups();
      if(isArtistLookups(artistLookupsResponse)) 
      {    
        lookups = artistLookupsResponse; 
    
        return  (    
          <>
            <PageNavigationBar action={ACTION.EDIT} mode={MODE.ALBUM}></PageNavigationBar>   
            <div className="flex flex-col w-full border-gray-100 bg-white h-full flex-1 pl-4 pr-4">
              <EditArtistTabs artist={artist} artistDescription={artistDescription} countryItems={lookups.countries} ></EditArtistTabs>
            </div>      
          </> 
        )
      } 
      else   
        return (   
          <Messages messages={artistLookupsResponse.messages}></Messages>
        )
    } 
    else 
      return ( 
        <Messages messages={artistResponse.messages}></Messages> 
      ) 
}; 