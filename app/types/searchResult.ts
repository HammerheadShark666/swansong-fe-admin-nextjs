import { AlbumLookup } from "./albumLookup";
import { ArtistLookup } from "./artistLookup";
import { MemberLookup } from "./memberLookup";

export type SearchResults = 
{
  albums: AlbumLookup[];
  artists: ArtistLookup[]; 
  members: MemberLookup[]; 
}