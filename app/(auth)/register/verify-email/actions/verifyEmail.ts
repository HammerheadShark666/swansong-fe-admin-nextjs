'use server'

import { API_VERIFY_EMAIL_REGISTRATION } from "@/app/lib/urls";
import { ApiResponse, ErrorResponse } from "@/app/interfaces/apiResponse";
import { API_METHOD } from "@/app/lib/enums";
import { apiCall } from "@/app/lib/apiHelper";
import { RegisterActionResponse } from "@/app/interfaces/registerActionResponse";    
import { VerifyRegistrationResponse } from "@/app/interfaces/verifyRegistrationResponse";

export async function verifyEmailRegistrationFromApi(token: string): Promise<ApiResponse<VerifyRegistrationResponse>> {
  
  return new Promise(async (resolve)  => {  

    const response = await apiCall<RegisterActionResponse>(API_VERIFY_EMAIL_REGISTRATION, API_METHOD.POST, JSON.stringify({"token": token})); 
    if (response.status == 200) {
      resolve({status: 200, data: response.data}); 
    } 
    else
    {
      const error = response.data as ErrorResponse;
      resolve({status: 400, data: {messages: error.messages}});    
    }
  });
}