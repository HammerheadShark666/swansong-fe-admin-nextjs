'use server'

import { apiCall } from "../../../lib/apiHelper";
import { cookies } from 'next/headers';
import { API_METHOD } from "../../../lib/enums";
import { LoginActionResponse } from "@/app/types/login";  
import { ApiResponse, ErrorResponse } from "@/app/interfaces/apiResponse";
import { API_LOGIN } from "../../../lib/urls";    
import { LoginResponse } from "@/app/interfaces/loginResponse";

export async function loginFromApi(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
     
  const cookieStore = await cookies(); 

  return new Promise(async (resolve)  => {
 
    const response = await apiCall<LoginActionResponse>(API_LOGIN, API_METHOD.POST, JSON.stringify({ email: email, password: password }));
    if(response.status == 200)
    {
			const data  = response.data as LoginActionResponse;
			if(response.data != null) {
        cookieStore.set('jwt', data.jwtToken, {path: '/', httpOnly: true, secure: true, sameSite: 'none', maxAge: 600});
        cookieStore.set('refresh-token', data.refreshToken, {path: '/', httpOnly: true, secure: true, sameSite: 'none', maxAge: 600});
        cookieStore.set('profile', JSON.stringify(data.profile), {path: '/', httpOnly: true, secure: true, sameSite: 'none', maxAge: 600});
			}
			resolve({status: 200, data: {message: "Login succesful"}} ); 
    } 
		else
    {
      const error = response.data as ErrorResponse;
      resolve({status: response.status, data: {messages: error.messages}});          
    } 
	}); 
}