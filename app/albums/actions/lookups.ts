import { apiGetCall } from "@/app/lib/apiHelper";
import { CACHE_TYPE } from "@/app/lib/enums"; 
import { ALBUM_LOOKUPS } from "@/app/lib/urls"; 
import { AlbumLookups } from "@/app/types/albumLookups";
  
export async function getAlbumLookups(): Promise<AlbumLookups> {
  return await apiGetCall<AlbumLookups>(ALBUM_LOOKUPS, CACHE_TYPE.CACHE);
}