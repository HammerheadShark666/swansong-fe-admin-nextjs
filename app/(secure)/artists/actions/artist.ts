'use server'

import { Artist } from "@/app/types/artist/artist";
import { ArtistDetailsSchema } from "@/app/artists/validation/artistDetailsSchema"; 
import { mapArtist, mapArtistDescription } from "@/app/lib/mappers/artistMapper";
import { ArtistDescriptionSchema } from "@/app/artists/validation/artistDescriptionSchema";
import { apiCallAuthenticated, apiGetCallAuthenticated } from "@/app/lib/apiHelper"; 
import { ArtistSearchItem } from "@/app/interfaces/artistSearchItem";
import { API_ARTIST_ADD, API_ARTIST_UPDATE, API_ARTIST_UPDATE_DESCRIPTION, API_GET_ARTIST, API_GET_RANDOM_ARTISTS, API_SEARCH_ARTISTS_BY_LETTER, API_SEARCH_ARTISTS_BY_TEXT } from "@/app/lib/urls";
import { formatString } from "@/app/lib/stringHelper";
import { AddEditActionResponse } from "@/app/interfaces/addEditActionResponse";
import { ApiResponse } from "@/app/interfaces/apiResponse";
import { API_METHOD, CACHE_TYPE } from "@/app/lib/enums";
import { ArtistLookup } from "@/app/types/artist/artistLookup";

export async function getRandomArtists(): Promise<ArtistLookup[]> { 
  return await apiGetCallAuthenticated<ArtistLookup[]>(API_GET_RANDOM_ARTISTS, CACHE_TYPE.NO_CACHE);
} 

export async function  saveNewArtistDetails(data: ArtistDetailsSchema): Promise<ApiResponse<AddEditActionResponse>> {  
  return await apiCallAuthenticated<AddEditActionResponse>(API_ARTIST_ADD, API_METHOD.POST, JSON.stringify(mapArtist(data)));
} 

export async function saveExistingArtistDetails(data: ArtistDetailsSchema): Promise<ApiResponse<AddEditActionResponse>> {  
  return await apiCallAuthenticated<AddEditActionResponse>(API_ARTIST_UPDATE, API_METHOD.PUT, JSON.stringify(mapArtist(data)));
}  

export async function saveExistingArtistDescriptionDetails(data: ArtistDescriptionSchema): Promise<ApiResponse<AddEditActionResponse>> {  
  return await apiCallAuthenticated<AddEditActionResponse>(API_ARTIST_UPDATE_DESCRIPTION, API_METHOD.PUT, JSON.stringify(mapArtistDescription(data)));
}

export async function getArtist(id: number): Promise<Artist> { 
  return await apiGetCallAuthenticated<Artist>(formatString(API_GET_ARTIST, id), CACHE_TYPE.NO_CACHE);
} 

export async function getArtistsByLetter(letter: string): Promise<ArtistSearchItem[]> {  
  return await apiGetCallAuthenticated<ArtistSearchItem[]>(formatString(API_SEARCH_ARTISTS_BY_LETTER, letter), CACHE_TYPE.NO_CACHE);
}

export async function getArtistsByText(text: string): Promise<ArtistSearchItem[]> {  
  return await apiGetCallAuthenticated<ArtistSearchItem[]>(formatString(API_SEARCH_ARTISTS_BY_TEXT, text), CACHE_TYPE.NO_CACHE);
} 