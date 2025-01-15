'use client'

import { useState } from "react"; 
import { ArtistMember } from "@/app/types/artist/artistMember";  
import LetterPicker from "@/app/components/searchDrawer/letterPicker";
import TextSearch from "@/app/components/searchDrawer/textSearch";
import Messages from "@/app/components/controls/messages";
import SearchSpinner from "@/app/components/searchDrawer/searchSpinner"; 
import { getMembersByLetter, getMembersByText } from "@/app/members/actions/member";
import { Message } from "@/app/types/message";
import { MemberSearchItem } from "@/app/interfaces/memberSearchItem"; 
import { DROP_MODE } from "@/app/lib/enums";
import { UpdateArtistMembersRequest } from "@/app/interfaces/updateArtistMembersRequest";
import MembersSource from "./membersSource";
import MembersDestination from "./membersDestination";
import { updateMemberArtistId } from "../../actions/artistMember";
import { delayAlertRemove } from "@/app/lib/generalHelper";
import { ErrorResponse } from "@/app/interfaces/apiResponse";

interface IProps {
  members: ArtistMember[];
  artistId: number;
  setShowSpinner: (show: boolean) => void;
}
 
export default function ArtistMembers({members, artistId, setShowSpinner}: IProps) {
   
  const [originalArtistMembers, setOriginalArtistMembers] = useState<ArtistMember[]>(structuredClone(members));
  const [messages, setMessages] = useState<Message[]>([]);  
  const [searchResults, setSearchResults] = useState<MemberSearchItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showNoResultsFound, setShowNoResultsFound] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false); 
  const [searchCriteria, setSearchCriteria] = useState(""); 
  const [destinationItems, setDestinationItems] = useState<MemberSearchItem[]>(members);
  const [membersToAdd, setMembersToAdd] = useState<MemberSearchItem[]>([]);
  const [membersToRemove, setMembersToRemove] = useState<MemberSearchItem[]>([]);
  
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

  async function search(criteria: string, searchBy: "letter" | "text")
  {
    setSearchCriteria(criteria); 
    preSearchInitialization();

    let results = await searchMembers(searchBy, criteria); 

    //Remove artists currently in the target
    results = filterResults(results);

    //Keep any artist in source that were in target before search
    results = addMembersRemovedFromDestinationIntoNewResults( originalArtistMembers, searchResults, results);

    results = results.filter(
      (item, index, self) => self.findIndex(i => i.id === item.id) === index
    ); 

    setSearchResults(sortMembers(results));
    postSearchSettings(results);
  }

  async function handleSearchClick (criteria: string, searchBy: "letter" | "text") { 

    try 
    { 
      setSearchResults([]);
      setMessages([]);
 
      if(criteria == '')
      {
        setMessages([{ severity: "error", text: "Select letter or enter text."}]); 
        return;
      }
 
      await search(criteria, searchBy); 
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

  async function handleDrop( 
    e: React.DragEvent<HTMLDivElement>,
    setTargetItems: React.Dispatch<React.SetStateAction<MemberSearchItem[]>>,
    targetItems: MemberSearchItem[],
    setSourceItems: React.Dispatch<React.SetStateAction<MemberSearchItem[]>>,
    sourceItems: MemberSearchItem[],
    mode: DROP_MODE 
  )   {

    try {
      e.preventDefault();

      const itemData = e.dataTransfer.getData("application/json");
      const droppedItem: MemberSearchItem = JSON.parse(itemData);

      if (!targetItems.some((item) => item.id === droppedItem.id)) {
        setTargetItems([...targetItems, droppedItem]);
        setSourceItems(sourceItems.filter((item) => item.id !== droppedItem.id)); 
      }  

      addRemoveMovedMember(droppedItem, mode); 
    } 
    catch(error)
    {
      setIsSearching(false);
      setMessages([{ severity: "error", text: "Error doing search. ("  + error + ")"}]);   
    }    
  }; 

  function addRemoveMovedMember(droppedItem: MemberSearchItem, mode: DROP_MODE) {

    const memberIsInOrigianlResults = originalArtistMembers.some(result => result.id === droppedItem.id);

    if(mode == DROP_MODE.ADD)
    {
      if(!memberIsInOrigianlResults)       
          addMemberToList(droppedItem, membersToAdd, setMembersToAdd);     
        else      
          removeMemberFromList(droppedItem.id, membersToRemove, setMembersToRemove);
    } 
    else if(mode == DROP_MODE.REMOVE) 
    {      
      if(memberIsInOrigianlResults)      
        addMemberToList(droppedItem, membersToRemove, setMembersToRemove);
      else
        removeMemberFromList(droppedItem.id, membersToAdd, setMembersToAdd);        
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
  };

  function removeMemberFromList(id: number, list: MemberSearchItem[], setList: React.Dispatch<React.SetStateAction<MemberSearchItem[]>>){
    const indexToRemove = list.findIndex(member => member.id === id);  
    if (indexToRemove !== -1)
      list.splice(indexToRemove, 1);  
    setList(list);      
  }

  function addMemberToList(member: MemberSearchItem, list: MemberSearchItem[], setList: React.Dispatch<React.SetStateAction<MemberSearchItem[]>>){
    list.push(member)
    setList(list);
  } 

  function resetMemberLists()
  {
    membersToRemove.map((memberToRemove) => {
      const indexToRemove = originalArtistMembers.findIndex(member => member.id === memberToRemove.id);
      if (indexToRemove !== -1)
        originalArtistMembers.splice(indexToRemove, 1);
    });

    membersToAdd.map((memberToAdd) => {
      const artistMember: ArtistMember = {id: memberToAdd.id, artistId: artistId, stageName: memberToAdd.stageName, photo: memberToAdd.photo };
      originalArtistMembers.push(artistMember);
    });
   
    membersToAdd.length = 0;
    membersToRemove.length = 0;

    setOriginalArtistMembers(originalArtistMembers);
    setDestinationItems(originalArtistMembers);
  }

  async function handleSaveArtistMembersClick() {    
     
    try 
    {
      setMessages([]);
      setShowSpinner(true);

      const membersToAddIds: number[] = membersToAdd.map(member => member.id);
      const membersToRemoveIds: number[] = membersToRemove.map(member => member.id);

      const updateArtistMembersRequest : UpdateArtistMembersRequest  = {
        artistId: artistId,
        membersToAdd: membersToAddIds,
        membersToRemove: membersToRemoveIds
      };

      const response = await updateMemberArtistId(updateArtistMembersRequest);

      if(response?.status == 200)     
      { 
        resetMemberLists();
        setMessages([{ severity: "info", text: "Artist members saved."}]);   
        delayAlertRemove().then(function() {
          setMessages([]);   
        });
      }      
      else
        if(response.data)        
          setMessages((response.data as ErrorResponse).messages);  
    } 
    catch(error)
    {
      setIsSearching(false);
      setMessages([{ severity: "error", text: "Error doing search. ("  + error + ")"}]);   
    }  
          
    setShowSpinner(false);
  }
 
  return (
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
          
          <MembersSource showSearchResults={showSearchResults} showNoResultsFound={showNoResultsFound} searchResults={searchResults} 
                          searchCriteria={searchCriteria} setSearchResults={setSearchResults} setDestinationItems={setDestinationItems} 
                            destinationItems={destinationItems} handleDrop={handleDrop} handleDragOver={handleDragOver} handleDragStart={handleDragStart}></MembersSource>

          <MembersDestination searchResults={searchResults} setSearchResults={setSearchResults} setDestinationItems={setDestinationItems} 
                                destinationItems={destinationItems} handleDrop={handleDrop} handleDragOver={handleDragOver} handleDragStart={handleDragStart} 
                                  handleSaveArtistMembersClick={handleSaveArtistMembersClick}></MembersDestination>          
        </div>
      </div> 
    </>
  )   
} 