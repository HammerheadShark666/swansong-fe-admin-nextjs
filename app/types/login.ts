export type ProfileResponse = { firstName: string, lastName: string, email: string };

export type LoginActionResponse = {jwtToken: string, refreshToken: string, profile: ProfileResponse};
  
export type RefreshTokenLoginActionResponse = {isAuthenticated: boolean, jwtToken: string, refreshToken: string, profile: ProfileResponse | null, role: string};
 
export type RefreshTokenLoginResponse = { message: string }

export function isLoginActionResponse(obj: any): obj is LoginActionResponse {
  return obj && typeof obj.jwtToken === "string" && typeof obj.refreshToken === "string";
} 

export function isRefreshTokenLoginActionResponse(obj: any): obj is RefreshTokenLoginActionResponse {
  return obj && typeof obj.jwtToken === "string" && typeof obj.refreshToken === "string" && typeof obj.role ===  "string";
} 