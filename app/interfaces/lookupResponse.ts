export interface LookupItemResponse 
{
  id: number;
  name: string;
}

export function isLookupItemResponse(obj: any): obj is LookupItemResponse {
  return obj && typeof obj.id === "number" && typeof obj.name === "string";
}