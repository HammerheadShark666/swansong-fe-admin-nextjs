import { AlbumLookup } from "../album/albumLookup"; 
import { MemberLookup } from "../member/memberLookup";

export type Artist = 
{
  id: number;
  name: string;  
  countryId: number;
  formationYear: number;
  disbandYear: number;
  photo: string;
  description:string;
  albums: AlbumLookup[];
  members: MemberLookup[];
}
  
export function isArtist(obj: any): obj is Artist {
  return obj && typeof obj.id === "number" && typeof obj.name === "string";
}