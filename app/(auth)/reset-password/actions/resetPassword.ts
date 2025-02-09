'use server'
 
import { API_FORGOTTEN_PASSWORD_RESET_PASSWORD } from "@/app/lib/urls";
import { ErrorResponse } from "@/app/interfaces/apiResponse";
import { API_METHOD } from "@/app/lib/enums";
import { apiCall } from "@/app/lib/apiHelper"; 
import { isResetPasswordResponse, ResetPasswordResponse } from "@/app/interfaces/resetPasswordResponse";
import { ResetPasswordSchema } from "../validation/resetPasswordSchema"; 
import { mapResetPassword } from "@/app/lib/mappers/resetPasswordMapper";

export async function resetPasswordFromApi(resetPassword: ResetPasswordSchema): Promise<ResetPasswordResponse | ErrorResponse> {

  return new Promise(async (resolve)  => { 

    const response = await apiCall<ResetPasswordResponse>(API_FORGOTTEN_PASSWORD_RESET_PASSWORD, API_METHOD.POST, JSON.stringify(mapResetPassword(resetPassword))); 
    if(isResetPasswordResponse(response))   
      resolve({message: "Reset password successful"});   
    else 
      resolve(response); 
  });
}