import { ErrorResponse } from "@/app/interfaces/apiResponse";
import { apiCallAuthenticated } from "@/app/lib/apiHelper";
import { API_METHOD } from "@/app/lib/enums";
import { API_REFRESH_TOKEN } from "@/app/lib/urls";
import { isRefreshTokenLoginActionResponse, RefreshTokenLoginActionResponse, RefreshTokenLoginResponse } from "@/app/types/login";
import { cookies } from 'next/headers';

export async function refreshTokenLogin(refreshToken: string): Promise<RefreshTokenLoginResponse | ErrorResponse> {  

  const cookieStore = await cookies(); 
    
  return new Promise(async (resolve)  => {
    
    const response = await apiCallAuthenticated<RefreshTokenLoginActionResponse>(API_REFRESH_TOKEN, API_METHOD.POST, JSON.stringify({"refreshToken": refreshToken}));

    if(isRefreshTokenLoginActionResponse(response))  
    {      
      cookieStore.set('jwt', response.jwtToken, {path: '/', httpOnly: true, secure: true, sameSite: 'none', maxAge: 60 * 2});
      cookieStore.set('refresh-token', response.refreshToken, {path: '/', httpOnly: true, secure: true, sameSite: 'none', maxAge: 60 * 60 * 12});
      cookieStore.set('profile', JSON.stringify(response.profile), {path: '/', httpOnly: true, secure: true, sameSite: 'none', maxAge: 600});      
      resolve({message: "Refresh Token Login succesful"}); 
    } 
    else  
      resolve(response);      
    }
  );
}  