import { Message } from "../types/message";
import { MESSAGE_TYPE } from "./enums";
import { delayAlertRemove } from "./generalHelper";

export function displayMessage(severity: string, message: string, setMessages:(messages: Message[]) => void ) 
{ 
    setMessages([{ severity: severity, text: message}]);  
    delayAlertRemove().then(function() {
        setMessages([]);   
    });
}

export function setMessagesValue(severity: MESSAGE_TYPE, info: unknown, setMessages: (messages: Message[]) => void) {

  let message = "";
  if (typeof info === "string") {
    message = info;  
  } else if (info instanceof Error) {
    message = info.message;  
  }

  setMessages([{severity: severity,  text: message}])
}