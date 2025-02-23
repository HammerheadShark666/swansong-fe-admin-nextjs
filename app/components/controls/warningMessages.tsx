'use client'

import { Message } from "@/app/types/message";
 
interface IProps {  
  messages: Message[]; 
  onClearMessages: () => void; 
} 

export default function ErrorMessages({messages, onClearMessages}: IProps) {

  const handleClick = () => {
    if (onClearMessages) {
      onClearMessages(); 
    } else {
      console.log('Default action triggered'); 
    }
  };

  return (
    <div>
      {messages.length > 0 && (
        <div className="flex p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50" role="alert">
          <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <span className="sr-only">Warnings</span>
          <div>
            <span className="font-medium">Warnings:</span>
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