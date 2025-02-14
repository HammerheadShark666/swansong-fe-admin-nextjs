'use client'

import { Message } from "@/app/types/message";
 
interface IProps {  
  messages: Message[]; 
  onClearMessages: () => void; 
} 

export default function InformationMessages({messages, onClearMessages}: IProps) {
 
  const handleClick = () => {
    if (onClearMessages) {
      onClearMessages(); 
    } else {
      console.log('Default action triggered'); 
    }
  };

  return (
    <div>
       {/* {messages.length > 0 && (
        <div className="flex flex-col items-center bg-blue-500 text-white text-sm font-bold p-4 gap-4" role="alert">
          {messages.map((error, index) => (
            <div className="w-full flex flex-row" key={index}>
              <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
  
            
              <p >{error.text}</p> 
              </div>
            ))} 
        </div>
      )} */}


      {messages.length > 0 && (
        <div className="flex p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50" role="alert">
        <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Information:</span>
          <ul className="mt-1.5 list-disc list-inside">
            {messages.map((error, index) => (
              <li key={index}>{error.text}</li>
            ))}
          </ul>
          
        </div>
        <button onClick={() => {handleClick()}} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#alert-1" aria-label="Close">
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
      )}
    </div>
)};