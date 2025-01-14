import { MemberSearchItem } from "@/app/interfaces/memberSearchItem";
import { poppins } from "@/app/layout";
import { DROP_MODE } from "@/app/lib/enums";
import Image from "next/image"; 


interface IProps {
  showSearchResults: boolean;
  showNoResultsFound: boolean;
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
                                            setDestinationItems, destinationItems, handleDrop, handleDragOver, handleDragStart}: IProps) {   

  return (
         
    <div className="grid-cols-12 col-span-12 md:grid-cols-6 md:col-span-6 mt-4 min-h-36">  
   
      {(showSearchResults || showNoResultsFound) ? (<p className="grid-cols-12 col-span-12 font-semibold mb-4">Results for &apos;{searchCriteria}&apos;....</p>) : (<></>)}
    
      <div className="min-h-72" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, setSearchResults, searchResults, setDestinationItems, destinationItems, DROP_MODE.REMOVE)}>
        {searchResults?.map((item: MemberSearchItem) => (      
          <div key={item.id} draggable onDragStart={(e) => handleDragStart(e, item)} className="grid grid-cols-12 hover:bg-stone-300 hover:cursor-pointer cursor-move">
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
        ))}     
      </div>    
    </div>  
  )
};