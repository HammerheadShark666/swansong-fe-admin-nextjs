export interface ResetPasswordResponse {
    message: string
}
  
export function isResetPasswordResponse(obj: any): obj is ResetPasswordResponse {
    return obj && typeof obj.message === "string";
}