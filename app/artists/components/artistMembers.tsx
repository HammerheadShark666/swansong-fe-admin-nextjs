'use client'

import { useEffect, useState } from "react"; 
import { ArtistMember } from "@/app/types/artist/artistMember";  
import LetterPicker from "@/app/components/searchDrawer/letterPicker";
import TextSearch from "@/app/components/searchDrawer/textSearch";
import Messages from "@/app/components/controls/messages";
import SearchSpinner from "@/app/components/searchDrawer/searchSpinner"; 
import { getMembersByLetter, getMembersByText } from "@/app/members/actions/member";
import { Message } from "@/app/types/message";
import { MemberSearchItem } from "@/app/interfaces/memberSearchItem"; 
import { poppins } from "@/app/layout"; 
import Image from "next/image"; 
import { DROP_MODE } from "@/app/lib/enums";

interface IProps {
  members: ArtistMember[];
  artistId: number;
  setShowSpinner: (show: boolean) => void;
}
 
export default function ArtistMembers({members, artistId, setShowSpinner}: IProps) {
   
  const [artistMembers, setArtistMembers] = useState<ArtistMember[]>(members);
  const [originalArtistMembers] = useState<ArtistMember[]>(structuredClone(members));
  // const [artistMember, setArtistMember] = useState<ArtistMember>(); 
  //const [mode, setMode] = useState<MODE>(MODE.MEMBER);
  // const [selectedRow, setSelectedRow] = useState<number | null>(null);  
  // const [clearMessages, setClearMessages] = useState<boolean>(false);
   const [messages, setMessages] = useState<Message[]>([]);  
  const [searchResults, setSearchResults] = useState<MemberSearchItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showNoResultsFound, setShowNoResultsFound] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false); 
  const [searchCriteria, setSearchCriteria] = useState(""); 
  const [destinationItems, setDestinationItems] = useState<MemberSearchItem[]>(members);

  const [membersToAdd, setMembersToAdd] = useState<MemberSearchItem[]>([]);
  const [membersToRemove, setMembersToRemove] = useState<MemberSearchItem[]>([]);
 
  useEffect(() => { 
 
     
    
  }, [artistMembers]);   
 
 
  async function searchMembers(searchBy: string, criteria: string) {

    switch(searchBy) {    
      case "letter":     
        return await getMembersByLetter(criteria);
      case "text":
        return await getMembersByText(criteria);      
      default:
        return [];    
    }
  }

  function preSearchInitialization() 
  { 
    setIsSearching(true); 
    setShowNoResultsFound(false);
    setShowSearchResults(false);
    setSearchResults([]);  
  }
  
  function postSearchSettings(results: MemberSearchItem[]) 
  {
    if((results && results.length > 0))
      setShowSearchResults(true);
    else
      setShowNoResultsFound(true); 
      
    setIsSearching(false); 
  } 

  function filterResults(results: MemberSearchItem[])
  {
    const artistMembers = destinationItems;
    const filteredResults: MemberSearchItem[] = [];

    //Remove members from search results that are in destination
    results.map((result) => {
      const memberIsInArtist = artistMembers.some(member => member.id === result.id);
      if(!memberIsInArtist)
        filteredResults.push(result);  
    });

    return filteredResults;
  }

  function addMembersRemovedFromDestinationIntoNewResults( originalArtistMembers: MemberSearchItem[], searchResults: MemberSearchItem[], filteredResults: MemberSearchItem[])
  {       
    //Get members from old search results that were in original artist members
    originalArtistMembers.map((originalMember) => {
      const memberIsInOldResults = searchResults.some(result => result.id === originalMember.id);
      if(memberIsInOldResults)
        filteredResults.push(originalMember);  
    });

    return filteredResults;
  }

  function sortMembers(members: MemberSearchItem[])
  {
      return members.sort((a, b) => a.stageName.localeCompare(b.stageName));
  }


  const handleSearchClick = async (criteria: string, searchBy: "letter" | "text") => { 

    try 
    { 
      setSearchResults([]);
      setMessages([]);
 
      if(criteria == '')
      {
        setMessages([{ severity: "error", text: "Select letter or enter text."}]); 
        return;
      }

      setSearchCriteria(criteria); 
      preSearchInitialization();

      let results = await searchMembers(searchBy, criteria); 

      //REMOVE artists currently in the target
      results = filterResults(results);

      //KEEP any artist in source that were in target before search
      results = addMembersRemovedFromDestinationIntoNewResults( originalArtistMembers, searchResults, results);

     
 
      setSearchResults(sortMembers(results));
      postSearchSettings(results);
    } 
    catch(error)
    {
      setIsSearching(false);
      setMessages([{ severity: "error", text: "Error doing search. ("  + error + ")"}]);   
    }    
  };

  const handleClearMessages = () => {
    setMessages([]);
  };   

  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: MemberSearchItem) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
  };
  
  // const handleDrop = (
  //   e: React.DragEvent<HTMLDivElement>,
  //   setTargetItems: React.Dispatch<React.SetStateAction<MemberSearchItem[]>>,
  //   targetItems: MemberSearchItem[],
  //   setSourceItems: React.Dispatch<React.SetStateAction<MemberSearchItem[]>>,
  //   sourceItems: MemberSearchItem[]
  // ) => {
  //   e.preventDefault();

  //   const itemData = e.dataTransfer.getData("application/json");
  //   const droppedItem: MemberSearchItem = JSON.parse(itemData);

  //   if (!targetItems.some((item) => item.id === droppedItem.id)) {
  //     setTargetItems([...targetItems, droppedItem]);
  //     setSourceItems(sourceItems.filter((item) => item.id !== droppedItem.id)); 
  //   }  
  // };


  // const handleDropMemberToSearchResults = (
  //   e: React.DragEvent<HTMLDivElement>,
  //   setTargetItems: React.Dispatch<React.SetStateAction<MemberSearchItem[]>>,
  //   targetItems: MemberSearchItem[],
  //   setSourceItems: React.Dispatch<React.SetStateAction<MemberSearchItem[]>>,
  //   sourceItems: MemberSearchItem[]
  // ) => {
  //   e.preventDefault();

  //   const itemData = e.dataTransfer.getData("application/json");
  //   const droppedItem: MemberSearchItem = JSON.parse(itemData);

  //   if (!targetItems.some((item) => item.id === droppedItem.id)) {
  //     setTargetItems([...targetItems, droppedItem]);
  //     setSourceItems(sourceItems.filter((item) => item.id !== droppedItem.id)); 
  //   }  

  //   //if item is in original list
  //   membersToRemove.push(droppedItem)
  //   setMembersToRemove(membersToRemove);
  // };


  // const handleDropSearchResultToMembers = (
  //   e: React.DragEvent<HTMLDivElement>,
  //   setTargetItems: React.Dispatch<React.SetStateAction<MemberSearchItem[]>>,
  //   targetItems: MemberSearchItem[],
  //   setSourceItems: React.Dispatch<React.SetStateAction<MemberSearchItem[]>>,
  //   sourceItems: MemberSearchItem[]
  // ) => {
  //   e.preventDefault();

  //   const itemData = e.dataTransfer.getData("application/json");
  //   const droppedItem: MemberSearchItem = JSON.parse(itemData);

  //   if (!targetItems.some((item) => item.id === droppedItem.id)) {
  //     setTargetItems([...targetItems, droppedItem]);
  //     setSourceItems(sourceItems.filter((item) => item.id !== droppedItem.id)); 
  //   }  

  //   //if item not in original list
  //   membersToAdd.push(droppedItem)
  //   setMembersToAdd(membersToAdd);
  // };


  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    setTargetItems: React.Dispatch<React.SetStateAction<MemberSearchItem[]>>,
    targetItems: MemberSearchItem[],
    setSourceItems: React.Dispatch<React.SetStateAction<MemberSearchItem[]>>,
    sourceItems: MemberSearchItem[],
    mode: DROP_MODE 
  ) => {
    e.preventDefault();

    const itemData = e.dataTransfer.getData("application/json");
    const droppedItem: MemberSearchItem = JSON.parse(itemData);

    if (!targetItems.some((item) => item.id === droppedItem.id)) {
      setTargetItems([...targetItems, droppedItem]);
      setSourceItems(sourceItems.filter((item) => item.id !== droppedItem.id)); 
    }  

    if(mode == DROP_MODE.ADD){
      membersToAdd.push(droppedItem)
      setMembersToAdd(membersToAdd);
    } else if(mode == DROP_MODE.REMOVE){
      membersToRemove.push(droppedItem)
      setMembersToRemove(membersToRemove);
    }
  };




  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
  };

  const handleSaveArtistMembersClick = () => {    
    console.log(membersToAdd);
    console.log(membersToRemove);

  };

  return(
    <> 
       <div className="grid grid-cols-12">
        <div className="grid grid-cols-12 col-span-12 min-h-10">  

          <div className="grid grid-cols-12 col-span-12 min-h-10">  
            <div className="grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5">  
              <LetterPicker handleSearchClick={handleSearchClick}></LetterPicker>
            </div>
            <div className="grid-cols-12 col-span-12 md:grid-cols-7 md:col-span-7 pl-10">  
              <TextSearch handleSearchClick={handleSearchClick}></TextSearch>
              <div id="search-results-messages" className="w-full grid-cols-12 col-span-12 mt-4">
                <Messages messages={messages} onClearMessages={handleClearMessages}></Messages>  
              </div>
              <SearchSpinner isSearching={isSearching}></SearchSpinner>     
            </div>
          </div>
          
          
        <div className="grid grid-cols-12 col-span-12"> 
        
          
          <div className="grid-cols-12 col-span-12 md:grid-cols-6 md:col-span-6 mt-4">  

          {(showSearchResults || showNoResultsFound) ? (<p className="grid-cols-12 col-span-12 font-semibold mb-4">Results for &apos;{searchCriteria}&apos;....</p>) : (<></>)}
        
          <div onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, setSearchResults, searchResults, setDestinationItems, destinationItems, DROP_MODE.REMOVE)}>
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

          <div className="grid-cols-12 col-span-12 md:grid-cols-6 md:col-span-6 mt-4">  


          <p className="grid-cols-12 col-span-12 font-semibold mb-4">Artist Members</p>
          <div onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, setDestinationItems, destinationItems, setSearchResults, searchResults, DROP_MODE.ADD)}>
       
       {destinationItems.map((item: MemberSearchItem) => (       

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



        
     <div className="grid grid-cols-12">
        <button onClick={handleSaveArtistMembersClick}  className="grid-cols-4 col-span-4 col-start-9 md:col-start-10 md:grid-cols-3 md:col-span-3 submit">
           Save          
        </button> 
        </div> 




          </div>




        </div>

        


        </div>
      </div>

 
 
  </>
  )   
} 