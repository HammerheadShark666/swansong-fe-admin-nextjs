import { AlbumLookup } from "../album/albumLookup"; 
import { ArtistMember } from "./artistMember";

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
  members: ArtistMember[];
}

export function isArtist(obj: any): obj is Artist {
  return obj && typeof obj.id === "number" && typeof obj.formationYear === "number" && typeof obj.name === "string";
}