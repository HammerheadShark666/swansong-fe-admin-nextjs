import { Message } from "../types/message";
import { ACTION, MODE } from "./enums";

export const ALERT_DELAY_REMOVE_TIME = 5000;

export function delayAlertRemove() {
  const promise = new Promise(function(resolve) {
    window.setTimeout(function() { 
        resolve('')
    }, ALERT_DELAY_REMOVE_TIME);
  });
  return promise;
}


export function getMessagesBySeverity(messages: Message[], severity: string) {
  return (messages != null && messages.length > 0)
                  ? messages.filter(i => i.severity === severity)
                  : [];
}

export function getModeLabel(mode: MODE)
{
  switch (mode){
    case MODE.ALBUM : 
      return "Album";
    case MODE.ARTIST : 
      return "Artist";
    case MODE.MEMBER : 
      return "Member";
    default:
      return "Unknow Mode"
  }
}

export function getActionLabel(action: ACTION)
{
  switch (action){
    case ACTION.ADD : 
      return "Add";
    case ACTION.EDIT : 
      return "Edit"; 
    default:
      return "Unknown Action"
  }
}