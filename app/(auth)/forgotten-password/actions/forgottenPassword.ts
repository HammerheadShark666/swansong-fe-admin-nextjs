'use server'

import { apiCall } from "../../../lib/apiHelper"; 
import { API_METHOD } from "../../../lib/enums";
import { ForgottenPasswordActionResponse, isForgottenPasswordActionResponse } from "@/app/types/forgottenPassword";  
import { ErrorResponse } from "@/app/interfaces/errorResponse";
import { API_FORGOTTEN_PASSWORD } from "../../../lib/urls";    
import { ForgottenPasswordResponse } from "@/app/interfaces/forgottenPasswordResponse";

export async function forgottenPasswordFromApi(email: string): Promise<ForgottenPasswordResponse | ErrorResponse> {
 
  return new Promise(async (resolve)  => {
 
    const response = await apiCall<ForgottenPasswordActionResponse>(API_FORGOTTEN_PASSWORD, API_METHOD.POST, JSON.stringify({ email: email }));
    if(isForgottenPasswordActionResponse(response))  
    {
         
      resolve({ message: response.message }); 
    } 
    else  
      resolve(response);      
 }); 
}