import { AlbumLookup } from "./album/albumLookup";
import { ArtistLookup } from "./artist/artistLookup";
import { MemberLookup } from "./member/memberLookup";

export type SearchResults = 
{
  albums: AlbumLookup[];
  artists: ArtistLookup[]; 
  members: MemberLookup[]; 
}

export function isSearchResults(obj: any): obj is SearchResults { 
 
  return obj && Array.isArray(obj.albums)
             && obj.albums.every((item: AlbumLookup) => typeof item.id === 'number' && typeof item.name === 'string' && typeof item.artistName === 'string')
             && Array.isArray(obj.artists)
             && obj.artists.every((item: ArtistLookup) => typeof item.id === 'number' && typeof item.name === 'string' && typeof item.photo === 'string')
             && Array.isArray(obj.members)
             && obj.members.every((item: MemberLookup) => typeof item.id === 'number' && typeof item.stageName === 'string' && typeof item.photo === 'string')
             && (obj.albums.length > 0 && obj.artists.length > 0 && obj.members.length > 0);
}