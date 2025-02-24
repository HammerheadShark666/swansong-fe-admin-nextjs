'use client'

import { Message } from "@/app/types/message";
import InformationMessages from "./InformationMessages";
import ErrorMessages from "./errorMessages";
import { MESSAGE_ERROR, MESSAGE_INFO, MESSAGE_WARNING } from "@/app/lib/constants";
import { getMessagesBySeverity } from "@/app/lib/generalHelper";
import WarningMessages from "./warningMessages";
 
interface IProps {  
  messages: Message[]; 
  onClearMessages?: () => void; 
} 

export default function Messages({messages, onClearMessages}: IProps) {

  const handleClick = () => {
    if (onClearMessages) {
      onClearMessages(); 
    } else {
      console.log('Default action triggered'); 
    }
  };

  return (
    <>
      {messages && messages.length > 0 && (
        <>
          <InformationMessages onClearMessages={handleClick} messages={getMessagesBySeverity(messages, MESSAGE_INFO)}></InformationMessages>
          <ErrorMessages onClearMessages={handleClick} messages={getMessagesBySeverity(messages, MESSAGE_ERROR)}></ErrorMessages>
          <WarningMessages onClearMessages={handleClick} messages={getMessagesBySeverity(messages, MESSAGE_WARNING)}></WarningMessages>
        </>
      )}
    </>
)}