export interface LoginResponse {
  message: string
}

export function isLoginResponse(obj: any): obj is LoginResponse {
  return obj && typeof obj.message === "string";
}