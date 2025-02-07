import SearchSpinner from "@/app/components/searchDrawer/searchSpinner";
import { MemberSearchItem } from "@/app/interfaces/memberSearchItem";
import { openSans } from "@/app/layout";
import { DROP_MODE } from "@/app/lib/enums";
import { getMemberPhoto } from "@/app/lib/memberHelper";
import Image from "next/image"; 

interface IProps {
  showSearchResults: boolean;
  showNoResultsFound: boolean;
  isSearching: boolean;
  searchResults: MemberSearchItem[];
  setSearchResults: React.Dispatch<React.SetStateAction<MemberSearchItem[]>>; 
  destinationItems: MemberSearchItem[];
  setDestinationItems: React.Dispatch<React.SetStateAction<MemberSearchItem[]>> 
  searchCriteria: string;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, item: MemberSearchItem) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>,
      setTargetItems: React.Dispatch<React.SetStateAction<MemberSearchItem[]>>,
      targetItems: MemberSearchItem[],
      setSourceItems: React.Dispatch<React.SetStateAction<MemberSearchItem[]>>,
      sourceItems: MemberSearchItem[],
      mode: DROP_MODE ) => void;
}

export default function  MembersSource({showSearchResults, showNoResultsFound, searchResults, searchCriteria, setSearchResults, 
                                          setDestinationItems, destinationItems, handleDrop, handleDragOver, handleDragStart, isSearching}: IProps) {   

  return (
         
    <div className="flex flex-col w-full md:w-1/3 min-h-fit md:border-l md:border-l-gray-200 md:border-1px md:pl-4"> 
      <SearchSpinner isSearching={isSearching}></SearchSpinner>  
      {(showSearchResults || showNoResultsFound) ? (<p className="w-full font-semibold border-l border-l-gray-200 border-t border-t-gray-200 border-b border-b-gray-200 border-1px mb-4 mt-4 md:mt-0 p-2">Results for &apos;{searchCriteria}&apos;....</p>) : (<></>)}
      <div className="h-[calc(100vh-320px)] overflow-y-scroll" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, setSearchResults, searchResults, setDestinationItems, destinationItems, DROP_MODE.REMOVE)}>
        {searchResults?.map((item: MemberSearchItem) => (      
          <div key={item.id} draggable onDragStart={(e) => handleDragStart(e, item)} className="flex flex-row w-full hover:bg-stone-300 hover:cursor-pointer cursor-move">
            <div className="flex flex-col p-1">  
              <Image className='hover:cursor-pointer' key={1} alt={"Member Photo"} 
                    src={`${getMemberPhoto(item)}`} width={50} height={50} style={{
                    width: '100%',
                    height: '100%',
                  }}/>
            </div>
            <div className="flex items-center">
              <p className={`${openSans.className} font-bold`}>{item.stageName}</p>    
            </div>         
          </div>              
        ))}     
      </div>    
    </div>  
  )
};