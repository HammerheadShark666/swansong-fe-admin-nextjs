import { AlbumSearchItem } from "@/app/interfaces/albumSearchItem";
import Image from "next/image";
import { openSans } from "@/app/fonts";
import { useRouter } from "next/navigation";
import Messages from "../controls/messages";
import { useEffect, useState } from "react";
import { Message } from "@/app/types/message";
import { ArtistSearchItem } from "@/app/interfaces/artistSearchItem";
import { MESSAGE_TYPE, MODE } from "@/app/lib/enums";
import { MemberSearchItem } from "@/app/interfaces/memberSearchItem";
import { getPhoto, getStoragePath } from "@/app/lib/imageHelper";
import { FE_ALBUM_EDIT, FE_ARTIST_EDIT, FE_MEMBER_EDIT } from "@/app/lib/urls";
 
interface IProps { 
  searchResults: AlbumSearchItem[] | ArtistSearchItem[] | MemberSearchItem[] | undefined;
  showNoResultsFound: boolean;
  showSearchResults: boolean;
  criteria: string;
  mode: MODE;
}

export default function SearchResults({mode, searchResults, showNoResultsFound, showSearchResults, criteria}: IProps) { 

  const [messages, setMessages] = useState<Message[]>([]);  
  const router = useRouter();
  
  const handleSearchResultClick = (id: number) => {     

    switch(mode){
      case MODE.ALBUM:
        router.push(FE_ALBUM_EDIT + id.toString());  
        return;
      case MODE.ARTIST:
        router.push(FE_ARTIST_EDIT + id.toString());  
        return;
      case MODE.MEMBER:
        router.push(FE_MEMBER_EDIT + id.toString());  
        return;
    }    
  };

  useEffect(() => {    
    setMessages([{ severity: MESSAGE_TYPE.INFO, text: "No " + mode + "s found."}]);   
  }, [mode]);

  const handleClearMessages = () => {
    setMessages([]);
  };  
 
  return (
    <div id="search-results" className="w-full h-[calc(100vh-250px)] grid-cols-12 col-span-12 overflow-y-scroll"> 

      {(showSearchResults || showNoResultsFound) ? (<p className="mb-4 font-semibold">Results for &apos;{criteria}&apos;....</p>) : (<></>)}

      {(showSearchResults) ? (
      
        searchResults?.map((item: AlbumSearchItem | ArtistSearchItem | MemberSearchItem) => (      
          <div key={item.id} className="grid grid-cols-12 hover:bg-stone-300 hover:cursor-pointer" onClick={() => handleSearchResultClick(item.id)}>
            <div className="grid-cols-2 col-span-2 p-1">
                <Image className='hover:cursor-pointer' key={1} alt={"Album Photo"} 
                                    src={`${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}${getStoragePath(mode)}/${getPhoto(item.photo, mode)}`} width={50} height={50} style={{
                      width: '100%',
                      height: '100%',
                    }}/>
              </div>
              <div className="grid-cols-10 col-span-10 flex items-center">
                <div>
                  { 'stageName' in item ? (
                     <p className={`${openSans.className} font-bold`}>{item.stageName}</p>
                  ) : (
                    <p className={`${openSans.className} font-bold`}>{item.name}</p>
                  )}                   

                  { 'artistName' in item ? (
                    <p className={`${openSans.className}`}>{item.artistName}</p>
                  ) : (
                    <></>
                  )}      
                </div>
              </div>     
          </div>        
          ))            
        ) : ((showNoResultsFound) ? (
          <Messages messages={messages} onClearMessages={handleClearMessages}></Messages>            
        ) : (<></>)
        )}   
    </div>
  )
}