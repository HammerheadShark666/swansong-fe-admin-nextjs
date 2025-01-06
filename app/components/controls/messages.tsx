import { Message } from "@/app/types/message";
import InformationMessages from "./InformationMessages";
import ErrorMessages from "./errorMessages";
import { MESSAGE_ERROR, MESSAGE_INFO, MESSAGE_WARNING } from "@/app/lib/constants";
import { getMessagesBySeverity } from "@/app/lib/generalHelper";
import WarningMessages from "./warningMessages";
 
interface IProps {  
  messages: Message[]; 
  onClearMessages: () => void; 
} 

export default function Messages({messages, onClearMessages}: IProps) {
  return (
    <>
      {messages.length > 0 && (
        <>
          <InformationMessages onClearMessages={onClearMessages} messages={getMessagesBySeverity(messages, MESSAGE_INFO)}></InformationMessages>
          <ErrorMessages onClearMessages={onClearMessages} messages={getMessagesBySeverity(messages, MESSAGE_ERROR)}></ErrorMessages>
          <WarningMessages onClearMessages={onClearMessages} messages={getMessagesBySeverity(messages, MESSAGE_WARNING)}></WarningMessages>
        </>
      )}
    </>
)}