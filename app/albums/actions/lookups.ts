import { apiGetCall } from "@/app/lib/apiHelper";
import { CACHE_TYPE } from "@/app/lib/enums"; 
import { API_ALBUM_LOOKUPS } from "@/app/lib/urls"; 
import { AlbumLookups } from "@/app/types/album/albumLookups";
  
export async function getAlbumLookups(): Promise<AlbumLookups> {
  return await apiGetCall<AlbumLookups>(API_ALBUM_LOOKUPS, CACHE_TYPE.CACHE);
}