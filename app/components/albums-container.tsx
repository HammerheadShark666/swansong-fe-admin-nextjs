import getUrl from "../lib/http"; //, { createUrl }
import getToolTip from "../lib/tooltip";
import { AlbumLookup } from "../types/album/albumLookup";
import Link from "next/link";
import { notFound } from "next/navigation"; 
import AlbumImage from "./albumImage";
import { getRandomAlbums } from "../albums/actions/album"; 
import { getPhoto } from "../lib/imageHelper";

async function getAlbums(): Promise<AlbumLookup[]> {
  
  try
  {
    return await getRandomAlbums();
  } 
  catch(error)
  { console.log(error);
    notFound(); 
  }   
}  

export default async function AlbumsContainer() {

  const albums = await getAlbums(); 

  return (          
    <>
      {albums && (          
        <div className="max-w-7xl mx-auto grid grid-cols-12">
          <div className="col-span-12">
            {albums && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-6 pt-4"> 
                {albums.map((album: AlbumLookup) => (     
                  <Link key={album.id} href={`${getUrl("albums", album.id)}`}>
                    <div className="tooltip object-fill w-full" data-tip={getToolTip(album)}>
                      <AlbumImage id={album.id} name={album.name} photoSrc={`${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}albums/${getPhoto(album.photo)}`}/>
                    </div>
                  </Link>              
                ))}
              </div>
            )}       
          </div>
        </div> 
      )}       
    </> 
  );
}