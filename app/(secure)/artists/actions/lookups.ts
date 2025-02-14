'use server'

import { ErrorResponse } from "@/app/interfaces/errorResponse";
import { apiGetCallAuthenticated } from "@/app/lib/apiHelper";
import { CACHE_TYPE } from "@/app/lib/enums"; 
import { API_ARTIST_LOOKUPS, API_ARTIST_LOOKUPS_FORM } from "@/app/lib/urls"; 
import { ArtistLookups } from "@/app/types/artist/artistLookups";
  
export async function getArtistLookups(): Promise<ArtistLookups | ErrorResponse> {
  return await apiGetCallAuthenticated<ArtistLookups>(API_ARTIST_LOOKUPS, CACHE_TYPE.CACHE);
}

export async function getArtistLookupsForm(): Promise<ArtistLookups | ErrorResponse> {
  return await apiGetCallAuthenticated<ArtistLookups>(API_ARTIST_LOOKUPS_FORM, CACHE_TYPE.CACHE);
}