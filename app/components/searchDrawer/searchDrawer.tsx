'use client'

import Link from "next/link";
import React, { useState } from "react"; 
import { getModeLabel } from "@/app/lib/generalHelper";
import { getAlbumsByLetter, getAlbumsByText } from "@/app/albums/actions/album";
import Messages from "../controls/messages";
import { Message } from "@/app/types/message";
import LetterPicker from "./letterPicker";
import { AlbumSearchItem } from "@/app/interfaces/albumSearchItem";
import SearchResults from "./searchResults";
import SearchSpinner from "./searchSpinner";
import TextSearch from "./textSearch";
import { ACTION, DIRECTION, MODE, SEARCH_MODE } from "@/app/lib/enums";
import { getArtistsByLetter, getArtistsByText } from "@/app/artists/actions/artist"; 
import { ArtistSearchItem } from "@/app/interfaces/artistSearchItem";

interface IProps { 
  mode: MODE; 
  action: ACTION;
}

export default function SearchDrawer({mode}: IProps) { 

  const toggleDrawer = () => setIsOpen(!isOpen);
  const [isOpen, setIsOpen] = useState(false); 
  const [messages, setMessages] = useState<Message[]>([]);  

  const [searchResults, setSearchResults] = useState<AlbumSearchItem[] | ArtistSearchItem[]>();
  const [isSearching, setIsSearching] = useState(false);
  const [showNoResultsFound, setShowNoResultsFound] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false); 
  const [searchCriteria, setSearchCriteria] = useState(""); 
  const [selectedLetter, setSelectedLetter] = useState(""); 
 
 
  const modeLabel = getModeLabel(mode);

  async function search(searchMode: SEARCH_MODE, criteria: string) {

    switch(mode)
    {
      case MODE.ALBUM: {
        return searchAlbums(searchMode, criteria);
      }
      case MODE.ARTIST: {
        return searchArtists(searchMode, criteria);
      }
      // case MODE.MEMBER: {
      //   return searchMembers(searchBy, criteria);
      // }       
      default:
        return [];
    } 
  }

  async function searchAlbums(searchMode: SEARCH_MODE , criteria: string) {

    switch(searchMode) {    
      case SEARCH_MODE.LETTER:     
        return await getAlbumsByLetter(criteria);
      case SEARCH_MODE.TEXT:
        return await getAlbumsByText(criteria);      
      default:
        return [];    
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

  function preSearchInitialization() 
  { 
    setIsSearching(true); 
    setShowNoResultsFound(false);
    setShowSearchResults(false);
    setSearchResults([]);  
  }

  function postSearchSettings(results: AlbumSearchItem[] | ArtistSearchItem[]) 
  {
    if((results && results.length > 0))
      setShowSearchResults(true);
    else
      setShowNoResultsFound(true); 
     
    setIsSearching(false); 
  } 

  const handleSearchClick = async (criteria: string, searchMode: SEARCH_MODE ) => { 

    try 
    {
      setMessages([]);
      setSelectedLetter("");
 
      if(criteria == '')
      {
        setMessages([{ severity: "error", text: "Select letter or enter text."}]); 
        return;
      }

      if(searchMode == SEARCH_MODE.LETTER)
        setSelectedLetter(criteria);

      setSearchCriteria(criteria); 
      preSearchInitialization();
      const results = await search(searchMode, criteria);
      setSearchResults(results);
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
  
  return (
    <> 
      <Link href="" onClick={toggleDrawer} className="text-black py-1.5 px-4 text-sm bg-[#b68d40] cursor-pointer text-center shadow-xs transition-all duration-500 hover:text-white ml-3 tooltip" data-tip={'Search ' + modeLabel +'s'}>
        <div className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="27px" height="27px"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/></svg>
        </div>
      </Link>  
      <div
        className={`fixed top-0 right-0 h-screen w-full md:w-1/2 lg:w-1/4 bg-white shadow-lg transform ${
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