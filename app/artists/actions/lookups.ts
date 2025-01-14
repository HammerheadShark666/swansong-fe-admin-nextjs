import { apiGetCall } from "@/app/lib/apiHelper";
import { CACHE_TYPE } from "@/app/lib/enums"; 
import { ARTIST_LOOKUPS, ARTIST_LOOKUPS_FORM } from "@/app/lib/urls"; 
import { ArtistLookups } from "@/app/types/artist/artistLookups";
  
export async function getArtistLookups(): Promise<ArtistLookups> {
  return await apiGetCall<ArtistLookups>(ARTIST_LOOKUPS, CACHE_TYPE.CACHE);
}

export async function getArtistLookupsForm(): Promise<ArtistLookups> {
  return await apiGetCall<ArtistLookups>(ARTIST_LOOKUPS_FORM, CACHE_TYPE.CACHE);
}