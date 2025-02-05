import getUrl from "../lib/http";
import getToolTip from "../lib/tooltip";
import { AlbumLookup } from "../types/album/albumLookup";
import Link from "next/link";
import { notFound } from "next/navigation"; 
import AlbumImage from "./albumImage";
import { getRandomAlbums } from "@/app/(secure)/albums/actions/album"; 
import { getPhoto } from "../lib/imageHelper";
import { MODE } from "../lib/enums";

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
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-6 pt-0"> 
                {albums.map((album: AlbumLookup) => (     
                  <Link key={album.id} href={`${getUrl("albums", album.id)}`}>
                    <div data-tooltip-target="tooltip-default" className="text-sm sm:text-base md:text-lg lg:text-xl object-fill w-full tooltip tooltip-top" data-tip={getToolTip(album)}>
                      <AlbumImage id={album.id} name={album.name} photoSrc={`${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}albums/${getPhoto(album.photo, MODE.ALBUM)}`}/>
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