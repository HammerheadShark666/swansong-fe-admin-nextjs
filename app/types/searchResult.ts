import { AlbumLookup } from "./album/albumLookup";
import { ArtistLookup } from "./artist/artistLookup";
import { MemberLookup } from "./member/memberLookup";

export type SearchResults = 
{
  albums: AlbumLookup[];
  artists: ArtistLookup[]; 
  members: MemberLookup[]; 
}