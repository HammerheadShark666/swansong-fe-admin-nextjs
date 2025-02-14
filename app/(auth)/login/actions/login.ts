'use server'

import { apiCall } from "../../../lib/apiHelper";
import { cookies } from 'next/headers';
import { API_METHOD } from "../../../lib/enums";
import { LoginActionResponse, isLoginActionResponse } from "@/app/types/login";  
import { ErrorResponse } from "@/app/interfaces/errorResponse";
import { API_LOGIN } from "../../../lib/urls";    
import { LoginResponse } from "@/app/interfaces/loginResponse";

export async function loginFromApi(email: string, password: string): Promise<LoginResponse | ErrorResponse> {
  const cookieStore = await cookies(); 

  return new Promise(async (resolve)  => {
 
    const response = await apiCall<LoginActionResponse>(API_LOGIN, API_METHOD.POST, JSON.stringify({ email: email, password: password }));
    if(isLoginActionResponse(response))  
    {
			if(response != null) {
        cookieStore.set('jwt', response.jwtToken, {path: '/', httpOnly: true, secure: true, sameSite: 'none', maxAge: 900});
        cookieStore.set('refresh-token', response.refreshToken, {path: '/', httpOnly: true, secure: true, sameSite: 'none', maxAge: 60 * 60 * 12});
        cookieStore.set('profile', JSON.stringify(response.profile), {path: '/', httpOnly: true, secure: true, sameSite: 'none', maxAge: 900});
			}
			resolve({message: "Login successful"}); 
    } 
		else  
      resolve(response);      
	}); 
}