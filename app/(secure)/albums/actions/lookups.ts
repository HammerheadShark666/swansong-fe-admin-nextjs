'use server'

import { ErrorResponse } from "@/app/interfaces/apiResponse";
import { apiGetCallAuthenticated } from "@/app/lib/apiHelper";
import { CACHE_TYPE } from "@/app/lib/enums"; 
import { API_ALBUM_LOOKUPS } from "@/app/lib/urls"; 
import { AlbumLookups } from "@/app/types/album/albumLookups";
  
export async function getAlbumLookups(): Promise<AlbumLookups | ErrorResponse> {
  return await apiGetCallAuthenticated<AlbumLookups>(API_ALBUM_LOOKUPS, CACHE_TYPE.CACHE);
}