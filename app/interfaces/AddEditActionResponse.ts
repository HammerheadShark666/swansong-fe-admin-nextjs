export interface AddEditActionResponse {id: number}

export function isAddEditActionResponse(obj: any): obj is AddEditActionResponse{
  return obj && typeof obj.id === "number";
}