import { AlbumSearchItem } from "@/app/interfaces/albumSearchItem";
import Image from "next/image";
import { poppins, raleway } from '@/app/layout';
import { useRouter } from "next/navigation";
import Messages from "../controls/messages";
import { useEffect, useState } from "react";
import { Message } from "@/app/types/message";
 
interface IProps { 
  searchResults: AlbumSearchItem[] | undefined;
  showNoResultsFound: boolean;
  showSearchResults: boolean;
  criteria: string;
  mode: string;
}

export default function LetterPicker({mode, searchResults, showNoResultsFound, showSearchResults, criteria}: IProps) { 

  const [messages, setMessages] = useState<Message[]>([]);  
  const router = useRouter();
  
  const handleSearchResultClick = (id: number) => {     

    switch(mode){
      case "album":
        router.push("/albums/album/edit/" + id.toString());  
        return;
      case "artist":
        router.push("/artists/artist/edit/" + id.toString());  
        return;
      case "member":
        router.push("/members/member/edit/" + id.toString());  
        return;
    }    
  };

  useEffect(() => {    
    setMessages([{ severity: "info", text: "No " + mode + "s found."}]);   
  }, [mode]);

  const handleClearMessages = () => {
    setMessages([]);
  };  

  return (
    <div id="search-results" className="w-full grid-cols-12 col-span-12"> 

      {(showSearchResults || showNoResultsFound) ? (<p className="mb-4 font-semibold">Results for &apos;{criteria}&apos;....</p>) : (<></>)}

    {(showSearchResults) ? (
    
      searchResults?.map((album: AlbumSearchItem ) => (      
          <div key={album.id} className="grid grid-cols-12 hover:bg-stone-300 hover:cursor-pointer" onClick={() => handleSearchResultClick(album.id)}>
          <div className="grid-cols-2 col-span-2 p-1">
              <Image className='hover:cursor-pointer' key={1} alt={"Album Photo"} 
                                  src={`${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}albums/${album.photo}`} width={50} height={50} style={{
                    width: '100%',
                    height: '100%',
                  }}/>
            </div>
            <div className="grid-cols-10 col-span-10 flex items-center">
              <div>
                <p className={`${raleway.className} font-bold`}>{album.name}</p>
                <p className={`${poppins.className}`}>{album.artistName}</p>
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