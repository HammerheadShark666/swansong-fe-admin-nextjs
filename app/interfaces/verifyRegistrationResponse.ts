export interface VerifyRegistrationResponse {
  message: string
}

export function isVerifyRegistrationResponse(obj: any): obj is VerifyRegistrationResponse { 
  return obj && typeof obj.message === "string"; 
}