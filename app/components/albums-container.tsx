import getUrl, { createUrl } from "../lib/http"; 
import getToolTip from "../lib/tooltip";
import { AlbumLookup } from "../types/albumLookup";
import Link from "next/link";
import { notFound } from "next/navigation"; 
import AlbumImage from "./albumImage";


async function getAlbums(): Promise<AlbumLookup[]> {
 
  const res = await fetch(createUrl('albums/random'), { cache: 'no-store' });
  if (!res.ok) {
    if(res.status == 404)
      notFound(); 
  }

  return res.json();
} 

export default async function AlbumsContainer() {

  const albums = await getAlbums(); 

  return (          
    <>
      {albums && (          
        <div className="max-w-7xl mx-auto grid grid-cols-12">
          <div className="col-span-12">    
            <div className="grid-cols-12 pt-5 pl-5"> 
              <span className="text-lg">Albums</span>
            </div>         
            {albums && (
              <div className="grid grid-cols-2 gap-4 mb-4 md:grid-cols-6 p-5"> 
                {albums.map((album: AlbumLookup) => (     
                  <Link key={album.id} href={`${getUrl("albums", album.id)}`}>
                    <div className="tooltip object-fill w-full" data-tip={getToolTip(album)}>
                      <AlbumImage id={album.id} name={album.name} photoSrc={`${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}albums/${album.photo}`}/>
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