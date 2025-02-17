'use client'

import AlbumImage from "@/app/components/albumImage"; 
import { MODE } from "@/app/lib/enums";
import getUrl from "@/app/lib/http";
import { getPhoto } from "@/app/lib/imageHelper";
import getToolTip from "@/app/lib/tooltip"; 
import { ArtistLookup } from "@/app/types/artist/artistLookup";
import Link from "next/link"; 

interface IProps { 
  artists: ArtistLookup[] | undefined; 
} 

export default function MemberArtists({artists}: IProps) {
 
  return (          
    <>
      {artists && (          
        <div className="max-w-7xl mx-auto grid grid-cols-12">
          <div className="col-span-12">
            {artists && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-6 pt-4"> 
                {artists.map((artist: ArtistLookup) => (     
                  <Link key={artist.id} href={`${getUrl("artists", artist.id)}`}>
                    <div className="tooltip object-fill w-full" data-tip={getToolTip(artist)}>
                      <AlbumImage id={artist.id} name={artist.name} photoSrc={`${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}artists/${getPhoto(artist.photo, MODE.ARTIST)}`}/>
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