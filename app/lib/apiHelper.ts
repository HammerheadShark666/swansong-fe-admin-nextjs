import { ErrorResponse } from "../interfaces/apiResponse"; 
import { API_METHOD, CACHE_TYPE, MESSAGE_TYPE } from "./enums";
import { cookies } from 'next/headers';

export async function apiCall<T>(path: string, method: API_METHOD, body: string | null): Promise<T | ErrorResponse> {
  
  let errorResponse: ErrorResponse;

  try
  {
    const response = await fetch(path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    }); 

    if(response.status == 200) {  
      const dataResponse: T = await response.json(); 
      return dataResponse;
    }      
    else   
      errorResponse = await response.json();           
  }
  catch(error){    
    console.log(error);
    errorResponse = { status: 500, messages: [{severity: MESSAGE_TYPE.ERROR, text: "Error occurred making unauthenticated post/put api call."}]};      
  }

  return errorResponse;  
}

export async function apiCallAuthenticated<T>(path: string, method: API_METHOD, body: string | null): Promise<T | ErrorResponse> {
 
  let errorResponse: ErrorResponse;

  try
  {
    const cookieStore = await cookies(); 
    const token = cookieStore.get('jwt'); 

    const response = await fetch(path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token?.value}`,
      },
      body: body
    }); 

    if(response.status == 200) {
      const dataResponse: T = await response.json(); 
      return dataResponse;
    }      
    else  
      errorResponse = await response.json();
  }
  catch(error){
    console.log(error);
    errorResponse = { status: 500, messages: [{severity: MESSAGE_TYPE.ERROR, text: "Error occurred making authenticated post/put api call."}]};  
  }

  return errorResponse;
}
 
export async function apiGetCall<T>(path: string, cacheType: CACHE_TYPE): Promise<T | ErrorResponse> { 

  let errorResponse: ErrorResponse;

  try
  { 
    const response = await fetch(path, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      cache: cacheType
    }); 

    if(response.status == 200) {       
      const dataResponse: T = await response.json(); 
      return dataResponse;
    }      
    else    
      errorResponse = await response.json();
  }
  catch(error){
    console.log(error);
    errorResponse = { status: 500, messages: [{severity: MESSAGE_TYPE.ERROR, text: "Error occurred making unauthenticated get api call."}]};     
  }

  return errorResponse;
}
 
export async function apiGetCallAuthenticated<T>(path: string, cacheType: CACHE_TYPE): Promise<T | ErrorResponse> {
  
    let errorResponse: ErrorResponse;

    try
    {
      const cookieStore = await cookies(); 
      const token = cookieStore.get('jwt'); 

      const response = await fetch(path, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token?.value}`,
        },
        cache: cacheType
      }); 

      if(response.status == 200) {       
        const dataResponse: T = await response.json(); 
        return dataResponse; 
      }      
      else   
        errorResponse = await response.json(); 
    }
    catch(error){
      console.log(error);
      errorResponse = { status: 500, messages: [{severity: MESSAGE_TYPE.ERROR, text: "Error occurred making unauthenticated get api call."}]};      
    }

    return errorResponse;
}
 
export async function apiPhotoCall<T>(path: string, method: API_METHOD, file: File | null | undefined): Promise<T | ErrorResponse> {
 
  let errorResponse: ErrorResponse;

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
 
    if(response.status == 200) {
      const dataResponse: T = await response.json(); 
      return dataResponse;  
    }      
    else
      errorResponse = await response.json(); 
  }
  catch(error){
    console.log(error);
    errorResponse = { status: 500, messages: [{severity: MESSAGE_TYPE.ERROR, text: "Error occurred making unauthenticated photo api call."}]}; 
  }

  return errorResponse;
}

export async function apiPhotoCallAuthenticated<T>(path: string, method: API_METHOD, file: File | null | undefined): Promise<T | ErrorResponse> {
 
  let errorResponse: ErrorResponse;

  try
  {
    if(file == null)
      throw new Error("Upload image is null.");

    const cookieStore = await cookies(); 
    const token = cookieStore.get('jwt');  
  
    const body = new FormData();
    body.set('file', file); 

    const response = await fetch(path, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token?.value}`,
      },
      body: body
    });

    if(response.status == 200) {
      const dataResponse: T = await response.json(); 
      return dataResponse;
    }      
    else
      errorResponse = await response.json();
  }
  catch(error) {
    console.log(error);
    errorResponse = { status: 500, messages: [{severity: MESSAGE_TYPE.ERROR, text: "Error occurred making authenticated photo api call."}]}; 
  }

  return errorResponse;
}