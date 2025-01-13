import { apiGetCall } from "@/app/lib/apiHelper";
import { CACHE_TYPE } from "@/app/lib/enums"; 
import { ARTIST_LOOKUPS } from "@/app/lib/urls"; 
import { ArtistLookups } from "@/app/types/artist/artistLookups";
  
export async function getArtistLookups(): Promise<ArtistLookups> {
  return await apiGetCall<ArtistLookups>(ARTIST_LOOKUPS, CACHE_TYPE.CACHE);
}