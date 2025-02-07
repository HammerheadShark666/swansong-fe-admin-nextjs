'use server'
 
import { API_REGISTER } from "@/app/lib/urls";
import { ErrorResponse } from "@/app/interfaces/apiResponse";
import { API_METHOD } from "@/app/lib/enums";
import { apiCall } from "@/app/lib/apiHelper";
import { RegisterActionResponse } from "@/app/interfaces/registerActionResponse"; 
import { isRegisterResponse, RegisterResponse } from "@/app/interfaces/registerResponse";
import { RegisterSchema } from "../validation/registerSchema";
import { mapRegister } from "@/app/lib/mappers/registerMapper";

export async function registerFromApi(register: RegisterSchema): Promise<RegisterResponse | ErrorResponse> {

  return new Promise(async (resolve)  => { 

    const response = await apiCall<RegisterActionResponse>(API_REGISTER, API_METHOD.POST, JSON.stringify(mapRegister(register))); 
    if(isRegisterResponse(response))   
      resolve({message: "Registration succesful"});   
    else 
      resolve(response); 
  });
}