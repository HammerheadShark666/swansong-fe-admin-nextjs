export interface ForgottenPasswordResponse {
    message: string
  }
  
  export function isForgottenPasswordResponse(obj: any): obj is ForgottenPasswordResponse {
    return obj && typeof obj.message === "string";
  }