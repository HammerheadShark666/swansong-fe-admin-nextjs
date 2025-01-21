import AlbumImage from "@/app/components/albumImage";
import { AlbumLookup } from "@/app/types/album/albumLookup";
import { ArtistLookup } from "@/app/types/artist/artistLookup";
import { MemberLookup } from "@/app/types/member/memberLookup";
import getToolTip from "@/app/lib/tooltip";
import Link from "next/link"; 
import getUrl from "@/app/lib/http";

export default function SearchResults({ results, type }: { results: AlbumLookup[] | ArtistLookup[] | MemberLookup[], type: string }) {
 
  const  getName = (result: AlbumLookup | ArtistLookup | MemberLookup): string => {
    return ("stageName" in result) ? result.stageName : result.name; 
  }

  const getTitle = (type: string): string => {     

    switch(type)
    {
      case "albums":
        return "Albums"
      case "artists":
        return "Artists"
      default:
        return "Members"
    }
  } 

  const hasResults = (results: AlbumLookup[] | ArtistLookup[] | MemberLookup[]) => {    
    return (results && results.length > 0) ? true : false;
  } 
   
  return ( 
    <> 
      { hasResults(results) && (   
        <div className="max-w-7xl mx-auto grid grid-cols-12">          
          <div className="col-span-12"> 
            <div className="grid-cols-12 pt-5 pl-5 pb-2"> 
              <span className="text-md text-decoration-line: underline text-white">{getTitle(type)}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-6 pl-5 pr-5">      
              {results.map((result: AlbumLookup | ArtistLookup | MemberLookup) => (  
                <Link key={result.id} href={`${getUrl(type, result.id)}`}>
                  <div className="tooltip object-fill w-full" data-tip={getToolTip(result)}>                      
                      <AlbumImage id={result.id} name={getName(result)} photoSrc={`${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}${type}/${result.photo}`}/>                 
                  </div>
                </Link>  
              ))}
            </div>              
          </div>
        </div> 
      )}       
    </>
  )
}