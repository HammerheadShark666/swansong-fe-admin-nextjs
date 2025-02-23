export interface AddPhotoResponse {filename: string}

export function isAddPhotoResponse(obj: any): obj is AddPhotoResponse {
  return obj && typeof obj.filename === "string";
}