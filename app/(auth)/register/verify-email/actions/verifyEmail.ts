'use server'

import { API_VERIFY_EMAIL_REGISTRATION } from "@/app/lib/urls";
import { ErrorResponse } from "@/app/interfaces/apiResponse";
import { API_METHOD } from "@/app/lib/enums";
import { apiCall } from "@/app/lib/apiHelper";
import { RegisterActionResponse } from "@/app/interfaces/registerActionResponse";    
import { isVerifyRegistrationResponse, VerifyRegistrationResponse } from "@/app/interfaces/verifyRegistrationResponse";

export async function verifyEmailRegistrationFromApi(token: string): Promise<VerifyRegistrationResponse | ErrorResponse> {
  
  return new Promise(async (resolve)  => {  

    const response = await apiCall<RegisterActionResponse>(API_VERIFY_EMAIL_REGISTRATION, API_METHOD.POST, JSON.stringify({"token": token})); 
    if(isVerifyRegistrationResponse(response))  
      resolve(response);
    else{
      resolve(response);   
    }
  });
}