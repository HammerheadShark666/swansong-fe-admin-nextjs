import Messages from "@/app/components/controls/messages";
import { MemberSearchItem } from "@/app/interfaces/memberSearchItem";
import { openSans } from "@/app/layout";
import { DROP_MODE } from "@/app/lib/enums"; 
import { getMemberPhoto } from "@/app/lib/memberHelper";
import { Message } from "@/app/types/message";
import Image from "next/image";  

interface IProps {
  searchResults: MemberSearchItem[];
  setSearchResults: React.Dispatch<React.SetStateAction<MemberSearchItem[]>>; 
  destinationItems: MemberSearchItem[];
  setDestinationItems: React.Dispatch<React.SetStateAction<MemberSearchItem[]>> 
  handleSaveArtistMembersClick: () => void;
  handleResetArtistMembersClick: () => void;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, item: MemberSearchItem) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>,
      setTargetItems: React.Dispatch<React.SetStateAction<MemberSearchItem[]>>,
      targetItems: MemberSearchItem[],
      setSourceItems: React.Dispatch<React.SetStateAction<MemberSearchItem[]>>,
      sourceItems: MemberSearchItem[],
      mode: DROP_MODE ) => void;
  handleClearMessages: () => void;
  messages: Message[];
}
 
export default function  MembersSource({searchResults, setSearchResults, setDestinationItems, destinationItems, 
                                          handleDrop, handleDragOver, handleDragStart, handleClearMessages, messages, handleSaveArtistMembersClick, handleResetArtistMembersClick}: IProps) {    
  return (  
    <>    
      <div className="flex flex-col min-h-fit w-full md:w-1/3 md:border-l md:border-l-gray-200 md:border-1px md:border-r md:border-r-gray-200 md:border-1px md:pl-4 md:mt-0 mt-8"> 
        <p className="flex font-semibold border-l border-l-gray-200 border-t border-t-gray-200 border-b border-b-gray-200 border-1px p-2">Artist Members</p>
        <div id="search-results-messages" className="w-full grid-cols-12 col-span-12 mt-4">
          <Messages messages={messages} onClearMessages={handleClearMessages}></Messages>  
        </div>
        <div className="w-full h-[calc(100vh-320px)] overflow-y-scroll mr-6" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, setDestinationItems, destinationItems, setSearchResults, searchResults, DROP_MODE.ADD)}>
          {destinationItems.map((item: MemberSearchItem) => (       

            <div key={item.id} draggable onDragStart={(e) => handleDragStart(e, item)} className="flex flex-row w-full hover:bg-stone-300 hover:cursor-pointer cursor-move">
              <div className="flex flex-col p-1">  
                <Image className='hover:cursor-pointer' key={1} alt={"Member Photo"} 
                          src={`${getMemberPhoto(item)}`} width={50} height={50} style={{
                  width: '100%',
                  height: '100%',
                }}/>
              </div>            
              <div className="flex items-center">                  
                <p className={`${openSans.className} font-bold`}>{item.stageName as string}</p>    
              </div>         
            </div>  
          ))}
        </div>     
      </div>

      <div className="flex flex-col pl-4">
        <button onClick={handleResetArtistMembersClick}  className="submit mb-4">
          Reset         
        </button> 
        <button onClick={handleSaveArtistMembersClick}  className="submit">
          Save          
        </button> 
      </div>
    </> 
  )
};