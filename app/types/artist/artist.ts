import { AlbumLookup } from "../album/albumLookup";
import { Member } from "../member/member";

export type Artist = 
{
  id: number;
  name: string; 
  photo: string;
  description:string;
  albums: AlbumLookup[];
  members: Member[];
}