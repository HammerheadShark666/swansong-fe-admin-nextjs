import { Message } from "../types/message";
import { delayAlertRemove } from "./generalHelper";

export function displayMessage(severity: string, message: string, setMessages:(messages: Message[]) => void ) 
{ 
    setMessages([{ severity: severity, text: message}]);  
    delayAlertRemove().then(function() {
        setMessages([]);   
    });
}

export function setErrorMessagesValue(error: unknown, setMessages: (messages: Message[]) => void) {

    let message = "";
    if (typeof error === "string") {
      message = error;  
    } else if (error instanceof Error) {
      message = error.message;  
    }

    setMessages([{severity: "error",  text: message}])
}