import { getAlbum } from "@/app/albums/actions/album";
import { getAlbumLookups } from "@/app/albums/actions/lookups"; 
import EditAlbumTabs from "@/app/albums/components/tabs/editAlbumTabs";
import PageNavigationBar from "@/app/components/navigation/pageNavigationBar"; 
import { ACTION, MODE } from "@/app/lib/enums";
import { Album } from "@/app/types/album/album";
import { AlbumDescription } from "@/app/types/album/albumDescription";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swansong - Edit Album",
  description: "Swansong music admin site"
}

export default async function EditAlbumPage({ params }:{ params: Promise<{ id: string }> } ) {      
  
  const {id} = await params; 
  const album = await getAlbum(Number(id)); 
  const albumDescription = getAlbumDescription(album);
  const lookups = await getAlbumLookups(); 
  
  function getAlbumDescription(album: Album){
    const albumDescription: AlbumDescription = {
      id: album.id,
      description: album.description
    }
    return albumDescription;
  }
 
  return  (    
    <>
      <PageNavigationBar action={ACTION.EDIT} mode={MODE.ALBUM}></PageNavigationBar>   
      <div className="flex flex-col w-full border-gray-100 bg-white h-full flex-1 pl-4 pr-4">
        <EditAlbumTabs album={album} albumDescription={albumDescription} artistItems={lookups.artists} studioItems={lookups.studios} recordLabelItems={lookups.recordLabels}></EditAlbumTabs>
      </div>      
    </> 
  )}; 