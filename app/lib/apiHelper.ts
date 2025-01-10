import { ApiResponse, ErrorResponse } from "../interfaces/apiResponse"; 
import { API_METHOD, CACHE_TYPE } from "./enums";  
 
export async function apiCall<T>(path: string, method: API_METHOD, body: string | null): Promise<ApiResponse<T>> {
 
  try
  {
    const response = await fetch(path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    });

    let data: ApiResponse<T> = { status: response.status, data: {} as T };

    if(response.status == 200) {
      if(method === 'POST' || method === 'PUT') {      
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
 
export async function apiGetCall<T>(path: string, cacheType: CACHE_TYPE): Promise<T> {
 
  try
  {
    const response = await fetch(path, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
      cache: cacheType
    }); 

    if(response.status == 200) {       
      const dataResponse: T = await response.json();
      return dataResponse;       
    }      
    else
    {
      throw new Error();
    }  
  }
  catch(error){
    console.log(error);
    throw new Error('Error occurred making api call.');
  }
}
 
export async function apiPhotoCall<T>(path: string, method: API_METHOD, file: File | null | undefined): Promise<ApiResponse<T>> {
 
  try
  {
    if(file == null)
      throw new Error("Upload image is null.");

    const body = new FormData();
    body.set('file', file); 

    const response = await fetch(path, {
      method: method,
      headers: {},
      body: body
    });

    let data: ApiResponse<T> = { status: response.status, data: {} as T };

    if(response.status == 200) {
      if(method === 'POST' || method === 'PUT') {      
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