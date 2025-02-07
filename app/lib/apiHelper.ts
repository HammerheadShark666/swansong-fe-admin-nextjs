import { ApiResponse, ErrorResponse } from "../interfaces/apiResponse"; 
import { API_METHOD, CACHE_TYPE } from "./enums";
import { cookies } from 'next/headers';

export async function apiCall<T>(path: string, method: API_METHOD, body: string | null): Promise<ApiResponse<T>> {
 
  let data: ApiResponse<T> = { status: 500, data: {} as T };

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
      if(method === API_METHOD.POST || method === API_METHOD.PUT) {      
        const dataResponse: T = await response.json();
        data = { status: response.status, data: dataResponse };   
      }
    }      
    else
    {
      const errorResponse: ErrorResponse = await response.json();
      data = { status: response.status, data: errorResponse };  
    }       
  }
  catch(error){    
    data = { status: 500, data: {messages: [{severity: "error", text: "Error occurred making unauthenticated post/put api call."}]}};   
  }

  return data;
}

export async function apiCallAuthenticated<T>(path: string, method: API_METHOD, body: string | null): Promise<ApiResponse<T>> {
 
  let data: ApiResponse<T> = { status: 500, data: {} as T };

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
      if(method === API_METHOD.POST || method === API_METHOD.PUT) {      
        const dataResponse: T = await response.json();
        data = { status: response.status, data: dataResponse };   
      }
    }      
    else
    {
      const errorResponse: ErrorResponse = await response.json();
      data = { status: response.status, data: errorResponse };  
    }          
  }
  catch(error){
    data = { status: 500, data: {messages: [{severity: "error", text: "Error occurred making authenticated post/put api call."}]}}; 
  }

  return data; 
}

// export async function apiGetCall<T>(path: string, cacheType: CACHE_TYPE): Promise<T> {
 
//   return new Promise(async (resolve)  => {

//     try
//     { 
//       const response = await fetch(path, {
//         method: "GET",
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         cache: cacheType
//       }); 

//       if(response.status == 200) {       
//         const dataResponse: T = await response.json();
//         return resolve(dataResponse);       
//       }      
//       else
//       {
//         throw new Error();
//       }  
//     }
//     catch(error){
//       throw new Error();       
//     }
//   });
// }


 
//export async function apiCallAuthenticated<T>(path: string, method: API_METHOD, body: string | null): Promise<ApiResponse<T>> {

// export async function apiGetCall<T>(path: string, cacheType: CACHE_TYPE): Promise<T> ;
// export async function apiGetCall<T>(path: string, cacheType: CACHE_TYPE): Promise<ErrorResponse>;
// export async function apiGetCall<T>(path: string, cacheType: CACHE_TYPE): Promise<T | ErrorResponse>
// {
//    const error: ErrorResponse = {messages: [] };

//    return error;
// }

// function getData(value: string): string;
// function getData(value: number): number;
// function getData(value: string | number): string | number {
//     if (typeof value === "string") {
//         return value.toUpperCase(); // Returns string
//     }
//     return value * 2; // Returns number
// }



export async function apiGetCall<T, E>(path: string, cacheType: CACHE_TYPE): Promise<T | E>;

instanceof

export async function apiGetCall<T>(path: string, cacheType: CACHE_TYPE): Promise<ApiResponse<T>> {
 
  //return new Promise(async (resolve)  => {

    let data: ApiResponse<T> = { status: 500, data: {} as T };

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
        data = { status: response.status, data: dataResponse };   
        //return resolve(dataResponse);       
      }      
      else
      {
        const errorResponse: ErrorResponse = await response.json();
        data = { status: response.status, data: errorResponse };  
      }  
    }
    catch(error){
      data = { status: 500, data: {messages: [{severity: "error", text: "Error occurred making authenticated get api call."}]}}; 
    }

    return data;
 // });
}

// export async function apiGetCallAuthenticated<T>(path: string, cacheType: CACHE_TYPE): Promise<T> {
 
//   return new Promise(async (resolve)  => {

//     try
//     {
//       const cookieStore = await cookies(); 
//       const token = cookieStore.get('jwt'); 

//       const response = await fetch(path, {
//         method: "GET",
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token?.value}`,
//         },
//         cache: cacheType
//       }); 

//       if(response.status == 200) {       
//         const dataResponse: T = await response.json();
//         return resolve(dataResponse);       
//       }      
//       else
//       {
//         throw new Error();
//       }  
//     }
//     catch(error){
//       console.log(error);
//       throw new Error('Error occurred making api call.');
//     }
//   });
// }

export async function apiGetCallAuthenticated<T>(path: string, cacheType: CACHE_TYPE): Promise<ApiResponse<T>> {
 
  //return new Promise(async (resolve)  => {

    let data: ApiResponse<T> = { status: 500, data: {} as T };

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
        data = { status: response.status, data: dataResponse };   
           
      }      
      else
      {
        const errorResponse: ErrorResponse = await response.json();
        data = { status: response.status, data: errorResponse };  
      }  
    }
    catch(error){
      data = { status: 500, data: {messages: [{severity: "error", text: "Error occurred making authenticated get api call."}]}}; 
    }

    return data;
  //});
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
      if(method === API_METHOD.POST || method === API_METHOD.PUT) {      
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

export async function apiPhotoCallAuthenticated<T>(path: string, method: API_METHOD, file: File | null | undefined): Promise<ApiResponse<T>> {
 
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

    let data: ApiResponse<T> = { status: response.status, data: {} as T };

    if(response.status == 200) {
      if(method === API_METHOD.POST || method === API_METHOD.PUT) {      
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
 
// export async function apiCall<T>(path: string, method: API_METHOD, body: string | null): Promise<ApiResponse<T>> {
 
//   try
//   {
//     const response = await fetch(path, {
//       method: method,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: body
//     });

//     let data: ApiResponse<T> = { status: response.status, data: {} as T };

//     if(response.status == 200) {
//       if(method === API_METHOD.POST || method === API_METHOD.PUT) {      
//         const dataResponse: T = await response.json();
//         data = { status: response.status, data: dataResponse };   
//       }
//     }      
//     else
//     {
//       const errorResponse: ErrorResponse = await response.json();
//       data = { status: response.status, data: errorResponse };  
//     }      

//     return data; 
//   }
//   catch(error){
//     console.log(error);
//     throw new Error('Error occurred making api call.');
//   }
// }
 
// export async function apiGetCall<T>(path: string, cacheType: CACHE_TYPE): Promise<T> {
 
//   try
//   {
//     const response = await fetch(path, {
//       method: "GET",
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       cache: cacheType
//     }); 

//     if(response.status == 200) {       
//       const dataResponse: T = await response.json();
//       return dataResponse;       
//     }      
//     else
//     {
//       throw new Error();
//     }  
//   }
//   catch(error){
//     console.log(error);
//     throw new Error('Error occurred making api call.');
//   }
// }
 
// export async function apiPhotoCall<T>(path: string, method: API_METHOD, file: File | null | undefined): Promise<ApiResponse<T>> {
 
//   try
//   {
//     if(file == null)
//       throw new Error("Upload image is null.");

//     const body = new FormData();
//     body.set('file', file); 

//     const response = await fetch(path, {
//       method: method,
//       headers: {},
//       body: body
//     });

//     let data: ApiResponse<T> = { status: response.status, data: {} as T };

//     if(response.status == 200) {
//       if(method === API_METHOD.POST || method === API_METHOD.PUT) {      
//         const dataResponse: T = await response.json();
//         data = { status: response.status, data: dataResponse };   
//       }
//     }      
//     else
//     {
//       const errorResponse: ErrorResponse = await response.json();
//       data = { status: response.status, data: errorResponse };  
//     }      

//     return data; 
//   }
//   catch(error){
//     console.log(error);
//     throw new Error('Error occurred making api call.');
//   }
// }