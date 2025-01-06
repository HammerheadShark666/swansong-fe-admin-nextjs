import { ApiResponse, ErrorResponse } from "../interfaces/apiResponse"; 
import { createUrl } from "./http";

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function apiCall<T>(path: string, method: Method, body: string | null): Promise<ApiResponse<T>> {
 
  try
  {
    const response = await fetch(createUrl(path), {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    });

    let data: ApiResponse<T> = { status: response.status, data: {} as T };

    if(response.status == 200) {
      if(method === 'GET' || method === 'POST' || method === 'PUT') {      
        const dataResponse: T = await response.json();
        data = { status: response.status, data: dataResponse };   
      }
    }      
    else
    {
      const errorResponse: ErrorResponse = await response.json();
      data = { status: response.status, data: errorResponse };  
    }      

    return data; 
  }
  catch(error){
    console.log(error);
    throw new Error('Error occurred making api call.');
  }
}