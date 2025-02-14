import { Message } from "../types/message";

export interface ErrorResponse {  
  status: number;
  messages: Message[];
}

export function isErrorResponse(obj: any): obj is ErrorResponse {
  return obj && typeof obj.status === "number" &&  Array.isArray(obj.messages) && obj.every((item: Message) => 
    typeof item.severity === "string" && 
    typeof item.text === "string"
  )
}