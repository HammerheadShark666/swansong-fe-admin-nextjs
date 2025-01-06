import { getAlbum } from "@/app/albums/actions/album";
import { getAlbumLookups } from "@/app/albums/actions/getSelectLookups"; 
import AlbumTabs from "@/app/albums/components/albumTabs";
import PageNavigationBar from "@/app/components/navigation/pageNavBar"; 

export default async function EditAlbumPage({ params }:{ params: Promise<{ id: string }> } ) {      
  
  const {id} = await params; 
  const album = await getAlbum(Number(id)); 
  const lookups = await getAlbumLookups();
 
  return  (    
    <>
      <PageNavigationBar label="Album" addUrl="/albums/album/add"></PageNavigationBar>   
      <div className="flex flex-col w-full border-gray-100 bg-white flex-1 p-4 mb-4">
        <AlbumTabs album={album} artistItems={lookups.artists} studioItems={lookups.studios} recordLabelItems={lookups.recordLabels}></AlbumTabs>
      </div>      
    </> 
  )}; 