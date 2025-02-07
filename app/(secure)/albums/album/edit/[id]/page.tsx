import { getAlbum } from "@/app/(secure)/albums/actions/album";
import { getAlbumLookups } from "@/app/(secure)/albums/actions/lookups"; 
import EditAlbumTabs from "@/app/(secure)/albums/components/tabs/editAlbumTabs";
import Messages from "@/app/components/controls/messages";
import PageNavigationBar from "@/app/components/navigation/pageNavigationBar";  
import { ACTION, MODE } from "@/app/lib/enums";
import { Album, isAlbum } from "@/app/types/album/album";
import { AlbumDescription } from "@/app/types/album/albumDescription"; 
import { AlbumLookups, isAlbumLookups } from "@/app/types/album/albumLookups"; 
import { Metadata } from "next"; 

export const metadata: Metadata = {
  title: "Swansong - Edit Album",
  description: "Swansong music admin site"
}

export default async function EditAlbumPage({ params }:{ params: Promise<{ id: string }> } ) {      
  
  let album: Album;
  let albumDescription: AlbumDescription;
  let lookups: AlbumLookups;
  const {id} = await params;   
   
  function getAlbumDescription(album: Album){
    const albumDescription: AlbumDescription = {
      id: album.id,
      description: album.description
    }
    return albumDescription;
  }
  
  const albumResponse = await getAlbum(Number(id)); 
  if(isAlbum(albumResponse)) 
  {
    album = albumResponse;
    albumDescription = getAlbumDescription(album);
   
    const albumLookupsResponse = await getAlbumLookups();
    if(isAlbumLookups(albumLookupsResponse)) 
    {    
      lookups = albumLookupsResponse; 
  
      return  (    
        <>
          <PageNavigationBar action={ACTION.EDIT} mode={MODE.ALBUM}></PageNavigationBar>   
          <div className="flex flex-col w-full border-gray-100 bg-white h-full flex-1 pl-4 pr-4">
            <EditAlbumTabs album={album} albumDescription={albumDescription} artistItems={lookups.artists} studioItems={lookups.studios} recordLabelItems={lookups.recordLabels}></EditAlbumTabs>
          </div>      
        </> 
      )
    } 
    else   
      return (   
        <Messages messages={albumLookupsResponse.messages}></Messages>
      )
  } 
  else 
    return ( 
      <Messages messages={albumResponse.messages}></Messages> 
    )
}; 