

export type ForgottenPasswordActionResponse = { message: string}
 
export function isForgottenPasswordActionResponse(obj: any): obj is ForgottenPasswordActionResponse {
  return obj && typeof obj.message === "string";
} 