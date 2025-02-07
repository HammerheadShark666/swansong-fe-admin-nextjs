export interface RegisterResponse {
  message: string
}

export function isRegisterResponse(obj: any): obj is RegisterResponse {
  return obj && typeof obj.message === "string";
}