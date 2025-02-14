'use client'

import Link from "next/link";
import React, { useState } from "react"; 
import { getModeLabel } from "@/app/lib/generalHelper"; 
import Messages from "../controls/messages";
import { Message } from "@/app/types/message";
import LetterPicker from "./letterPicker";
import { AlbumSearchItem, isAlbumSearchItemArray } from "@/app/interfaces/albumSearchItem";
import SearchResults from "./searchResults";
import SearchSpinner from "./searchSpinner";
import TextSearch from "./textSearch";
import { ACTION, DIRECTION, MESSAGE_TYPE, MODE, SEARCH_MODE } from "@/app/lib/enums";
import { getArtistsByLetter, getArtistsByText } from "@/app/(secure)/artists/actions/artist"; 
import { ArtistSearchItem, isArtistSearchItemArray } from "@/app/interfaces/artistSearchItem";
import { getMembersByLetter, getMembersByText } from "@/app/(secure)/members/actions/member";
import { isMemberSearchItemArray, MemberSearchItem } from "@/app/interfaces/memberSearchItem";
import { getAlbumsByLetter, getAlbumsByText } from "@/app/(secure)/albums/actions/album";
import { ErrorResponse, isErrorResponse } from "@/app/interfaces/errorResponse";
import { CiSearch } from "react-icons/ci";

interface IProps { 
  mode: MODE; 
  action: ACTION;
}

export default function SearchDrawer({mode}: IProps) { 

  const toggleDrawer = () => setIsOpen(!isOpen);
  const [isOpen, setIsOpen] = useState(false); 
  const [messages, setMessages] = useState<Message[]>([]);  

  const [searchResults, setSearchResults] = useState<AlbumSearchItem[] | ArtistSearchItem[] | MemberSearchItem[]>();
  const [isSearching, setIsSearching] = useState(false);
  const [showNoResultsFound, setShowNoResultsFound] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false); 
  const [searchCriteria, setSearchCriteria] = useState(""); 
  const [selectedLetter, setSelectedLetter] = useState("");  
 
  const modeLabel = getModeLabel(mode);

  async function search(searchMode: SEARCH_MODE, criteria: string): Promise<AlbumSearchItem[] | ArtistSearchItem[] | MemberSearchItem[] | ErrorResponse > {

    switch(mode)
    {
      case MODE.ALBUM: {
       return searchAlbums(searchMode, criteria);
      }
      case MODE.ARTIST: {
        return searchArtists(searchMode, criteria);
      }
      case MODE.MEMBER: {
        return searchMembers(searchMode, criteria);
      }       
      default:
        const errorResponse: ErrorResponse = { status: 500, messages: [{ severity: MESSAGE_TYPE.ERROR, text: "Invalid Search Mode"}]};
        return errorResponse;
    } 
  }

  async function searchAlbums(searchMode: SEARCH_MODE , criteria: string) {

    switch(searchMode) {    
      case SEARCH_MODE.LETTER:           
        return await getAlbumsByLetter(criteria);       
      case SEARCH_MODE.TEXT:        
        return await getAlbumsByText(criteria);        
    }
  }

  async function searchArtists(searchMode: SEARCH_MODE , criteria: string) {

    switch(searchMode) {    
      case SEARCH_MODE.LETTER:     
        return await getArtistsByLetter(criteria);
      case SEARCH_MODE.TEXT:
        return await getArtistsByText(criteria);      
      default:
        return [];    
    }
  }

  async function searchMembers(searchMode: SEARCH_MODE , criteria: string) {

    switch(searchMode) {    
      case SEARCH_MODE.LETTER:     
        return await getMembersByLetter(criteria);
      case SEARCH_MODE.TEXT:
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

  function postSearchSettings(results: AlbumSearchItem[] | ArtistSearchItem[] | MemberSearchItem[]) 
  {
    if((results && results.length > 0))
      setShowSearchResults(true);
    else
      setShowNoResultsFound(true); 
     
    setIsSearching(false); 
  } 

  function isSearchItems(obj: any): obj is ArtistSearchItem[] | AlbumSearchItem[] | MemberSearchItem[] { 
    return (
        isArtistSearchItemArray(obj) || isAlbumSearchItemArray(obj) || isMemberSearchItemArray(obj)
    );
  }

  const handleSearchClick = async (criteria: string, searchMode: SEARCH_MODE ) => { 

    try 
    {
      setMessages([]);
      setSelectedLetter("");
 
      if(criteria == '')
      {
        setMessages([{ severity: MESSAGE_TYPE.ERROR, text: "Select letter or enter text."}]); 
        return;
      }

      if(searchMode == SEARCH_MODE.LETTER)
        setSelectedLetter(criteria);

      setSearchCriteria(criteria); 
      preSearchInitialization();

      const response = await search(searchMode, criteria);
      if(isSearchItems(response))
      {
        setSearchResults(response);
        postSearchSettings(response);
      } 
      else if(isErrorResponse(response))
        setMessages(response.messages);
    } 
    catch(error)
    {
      setMessages([{ severity: MESSAGE_TYPE.ERROR, text: "Error doing search. ("  + error + ")"}]);   
    }    
    finally
    {
      setIsSearching(false);
    }
  };
 
  const handleClearMessages = () => {
    setMessages([]);
  };  
  
  return (
    <> 
      <Link href="" onClick={toggleDrawer} className="text-black text-sm bg-[#b68d40] cursor-pointer text-center shadow-xs transition-all duration-500 hover:text-white tooltip" data-tip={'Search ' + modeLabel +'s'}>
        <div className="flex justify-center items-center h-8 w-12">
          <CiSearch className="w-8 h-8 block align-middle" />
        </div>       
      </Link>  
      <div
        className={`p-4 fixed top-0 right-0 h-screen w-full md:w-1/2 lg:w-1/4 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-40`}
      >
        <div className="p-4 border-b flex justify-between items-center mr-2 md:mr-0">
          <h2 className="text-lg font-semibold">Search {modeLabel}s</h2>
          <button
            onClick={toggleDrawer}
            className="px-3 py-1"
          >
            Close
          </button>
        </div>
        <div className="p-4 grid grid-cols-12">           
          <LetterPicker selectedLetter={selectedLetter} direction={DIRECTION.HORIZONTAL} handleSearchClick={handleSearchClick}></LetterPicker>
          <TextSearch handleSearchClick={handleSearchClick}></TextSearch>
          <div id="search-results-messages" className="w-full grid-cols-12 col-span-12 mt-4">
            <Messages messages={messages} onClearMessages={handleClearMessages}></Messages>  
          </div>
          <SearchSpinner isSearching={isSearching}></SearchSpinner>     
          <SearchResults mode={mode} searchResults={searchResults} showNoResultsFound={showNoResultsFound} showSearchResults={showSearchResults} criteria={searchCriteria}></SearchResults>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
        ></div>
      )}
    </>
  );
};