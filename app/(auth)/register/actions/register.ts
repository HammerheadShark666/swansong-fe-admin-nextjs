'use server'
 
import { API_REGISTER } from "@/app/lib/urls";
import { ApiResponse, ErrorResponse } from "@/app/interfaces/apiResponse";
import { API_METHOD } from "@/app/lib/enums";
import { apiCall } from "@/app/lib/apiHelper";
import { RegisterActionResponse } from "@/app/interfaces/registerActionResponse"; 
import { RegisterResponse } from "@/app/interfaces/registerResponse";
import { RegisterSchema } from "../validation/registerSchema";
import { mapRegister } from "@/app/lib/mappers/registerMapper";

export async function registerFromApi(register: RegisterSchema): Promise<ApiResponse<RegisterResponse>> {

  return new Promise(async (resolve)  => { 

    const response = await apiCall<RegisterActionResponse>(API_REGISTER, API_METHOD.POST, JSON.stringify(mapRegister(register))); 
    if (response.status == 200) 
    {
      resolve({status: 200, data: {message: "Login succesful"}});       
    }   
    else
    {
      const error = response.data as ErrorResponse;
      resolve({status: 400, data: {messages: error.messages}});  
    }
  });
}