import { AlbumLookup } from "./albumLookup";
import { Member } from "./member";

export type Artist = 
{
  id: number;
  name: string; 
  photo: string;
  description:string;
  albums: AlbumLookup[];
  members: Member[];
}