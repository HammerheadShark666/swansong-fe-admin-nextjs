import { openSans } from "@/app/layout";
import { ACTION, MODE } from "@/app/lib/enums";
import { LookupItem } from "@/app/types/lookups";
import { useEffect, useState } from "react";
import LookupItemForm from "./lookupItemForm";

interface IProps { 
  mode: MODE;
  items:LookupItem[]
  setShowSpinner: (show: boolean) => void;
}

function sortLookupItems(lookupItems: LookupItem[]) 
{
  const sortedLookupItems = [...lookupItems].sort((a, b)=> {    
    return a.name < b.name ? -1 : 1;    
  })
  return sortedLookupItems;
} 
 
export default function Lookup({ mode, items, setShowSpinner }: IProps) {
 
  const [lookupItems, setLookupItems] = useState<LookupItem[]>(items);
  const [lookupItem, setLookupItem] = useState<LookupItem>(); 
  const [action, setAction] = useState<ACTION>(ACTION.ADD);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);  
  const [clearMessages, setClearMessages] = useState<boolean>(false);
       
  useEffect(() => {  
    const sortedLookupItems =  sortLookupItems([...lookupItems]) ;
    if (JSON.stringify(lookupItems) !== JSON.stringify(sortedLookupItems))
      setLookupItems(sortedLookupItems);
    
  }, [lookupItems]);   
    
  const addLookupItemToList = (lookupItem: LookupItem) => {
    setLookupItems((prevItems) => [...prevItems, lookupItem]); 
    setSelectedRow(null);
  };

  const updateLookupItemInList  = (lookupItem: LookupItem) => {
    setLookupItems((prevItems) =>
      prevItems.map((item) => (item.id === lookupItem.id ? lookupItem : item))
    );
    setLookupItem(undefined);
    setSelectedRow(null);
  };  
    
  const removeLookupItemFromList  = (id: number) => {

    const updatedLookupItemsList = lookupItems.filter(obj => obj.id !== id);
    if (JSON.stringify(lookupItems) !== JSON.stringify(updatedLookupItemsList))
      setLookupItems(updatedLookupItemsList);
  }

  const handleRowClick = (item: LookupItem) => {
    setLookupItem(structuredClone(item));
    setAction(ACTION.EDIT);
    setSelectedRow(item.id);
    setClearMessages(true);
  }; 

  return (
    <div className="flex flex-col md:flex-row flex-1 h-full w-full">   
      <div className="p-4 flex flex-col w-full md:w-1/2 min-h-fit md:border-l md:border-l-gray-200 md:border-1px md:pl-4"> 
        <div className="h-[calc(100vh-320px)] overflow-y-scroll">
          {lookupItems?.map((item: LookupItem) => (      
            <div onClick={() => handleRowClick(item)} key={item.id} className="flex flex-row w-full hover:bg-stone-300 hover:cursor-pointer cursor-move">
              <div className={`flex flex-col p-1 text-xs w-full border-b border-slate-600 hover:bg-slate-300 hover:cursor-pointer ${
                selectedRow === item.id ? "bg-blue-100" : ""
              }`}>  
                <p className={`${openSans.className} font-bold`}>{item.name as string}</p>    
              </div> 
            </div>              
          ))}     
        </div>   
      </div> 
      <div className="w-1/2 p-4 h-full">          
        <LookupItemForm lookupItem={lookupItem} mode={mode} setAction={setAction} setSelectedRow={setSelectedRow} 
          setClearMessages={setClearMessages} action={action} clearMessages={clearMessages} setShowSpinner={setShowSpinner}
          addLookupItemToList={addLookupItemToList} updateLookupItemInList={updateLookupItemInList} removeLookupItemFromList={removeLookupItemFromList}></LookupItemForm>
      </div> 
    </div>
  )    
} 