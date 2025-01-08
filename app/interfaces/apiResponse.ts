import { Message } from "../types/message";

export interface ErrorResponse {  
  messages: Message[];
}

export interface ApiResponse<T> {
  status: number;
  data: T | ErrorResponse;
}