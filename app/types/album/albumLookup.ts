import { ErrorResponse } from "@/app/interfaces/errorResponse";

export type AlbumLookup = 
{
  id: number;
  name: string; 
  artistName: string;
  photo: string;
}
 
export function isAlbumLookup(obj: any): obj is AlbumLookup {
  return obj && typeof obj.id === "number" && typeof  obj.name === "string";
}

export function isAlbumLookupArray(obj: AlbumLookup[] | ErrorResponse): obj is AlbumLookup[] {
  return (
    Array.isArray(obj) && obj.every(item => 
      typeof item.id === "number" && 
      typeof item.name === "string" && 
      typeof item.artistName === "string"
    )
  );
}
 