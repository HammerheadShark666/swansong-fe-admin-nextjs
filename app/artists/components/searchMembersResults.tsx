import Image from "next/image";
import { poppins } from '@/app/layout'; 
import { useEffect, useState } from "react";
import { Message } from "@/app/types/message";
import { MemberSearchItem } from "@/app/interfaces/memberSearchItem";
import { MODE } from "@/app/lib/enums"; 
import Messages from "@/app/components/controls/messages";
 
interface IProps { 
  searchResults: MemberSearchItem[] | undefined;
  showNoResultsFound: boolean;
  showSearchResults: boolean;
  criteria: string;
  mode: MODE;
}

export default function SearchMemberResults({mode, searchResults, showNoResultsFound, showSearchResults, criteria}: IProps) { 

  const [messages, setMessages] = useState<Message[]>([]);   
  
  const handleSearchResultClick = (id: number) => {     
 
  };

  // function getStoragePath()
  // {
  //   switch(mode){
  //     case MODE.ALBUM:         
  //       return "albums";
  //     case MODE.ARTIST:
  //       return "artists";
  //     case MODE.MEMBER:
  //       return "members";
  //   }    
  // }

  useEffect(() => {    
    setMessages([{ severity: "info", text: "No " + mode + "s found."}]);   
  }, [mode]);

  const handleClearMessages = () => {
    setMessages([]);
  };  

  return (
    <div id="search-results" className="w-full h-[calc(100vh-250px)] grid-cols-12 col-span-12 overflow-y-scroll"> 

      {(showSearchResults || showNoResultsFound) ? (<p className="mb-4 font-semibold">Results for &apos;{criteria}&apos;....</p>) : (<></>)}

      {(showSearchResults) ? (
      
        searchResults?.map((item: MemberSearchItem) => (      
          <div key={item.id} className="grid grid-cols-12 hover:bg-stone-300 hover:cursor-pointer" onClick={() => handleSearchResultClick(item.id)}>
            <div className="grid-cols-2 col-span-2 p-1">
                <Image className='hover:cursor-pointer' key={1} alt={"Album Photo"} 
                          src={`${process.env.NEXT_PUBLIC_AZURE_STORAGE_URL}members/${item.photo}`} width={50} height={50} style={{
                      width: '100%',
                      height: '100%',
                    }}/>
              </div>
              <div className="grid-cols-10 col-span-10 flex items-center"> 
                <div>                  
                  <p className={`${poppins.className} font-bold`}>{item.stageName as string}</p>    
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