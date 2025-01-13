import { Artist } from "@/app/types/artist/artist";
import { ArtistDetailsSchema } from "@/app/artists/validation/artistDetailsSchema"; 
import { mapArtist, mapArtistDescription } from "@/app/lib/mappers/artistMapper";
import { ArtistDescriptionSchema } from "@/app/artists/validation/artistDescriptionSchema";
import { apiCall, apiGetCall } from "@/app/lib/apiHelper"; 
import { ArtistSearchItem } from "@/app/interfaces/artistSearchItem";
import { ARTIST_ADD, ARTIST_UPDATE, ARTIST_UPDATE_DESCRIPTION, GET_ARTIST, GET_RANDOM_ARTISTS, SEARCH_ARTISTS_BY_LETTER, SEARCH_ARTISTS_BY_TEXT } from "@/app/lib/urls";
import { formatString } from "@/app/lib/stringHelper";
import { AddEditActionResponse } from "@/app/interfaces/addEditActionResponse";
import { ApiResponse } from "@/app/interfaces/apiResponse";
import { API_METHOD, CACHE_TYPE } from "@/app/lib/enums";
import { ArtistLookup } from "@/app/types/artist/artistLookup";

export async function getRandomArtists(): Promise<ArtistLookup[]> { 
  return await apiGetCall<ArtistLookup[]>(GET_RANDOM_ARTISTS, CACHE_TYPE.NO_CACHE);
} 

export async function  saveNewArtistDetails(data: ArtistDetailsSchema): Promise<ApiResponse<AddEditActionResponse>> {  
  return await apiCall<AddEditActionResponse>(ARTIST_ADD, API_METHOD.POST, JSON.stringify(mapArtist(data)));
} 

export async function saveExistingArtistDetails(data: ArtistDetailsSchema): Promise<ApiResponse<AddEditActionResponse>> {  
  return await apiCall<AddEditActionResponse>(ARTIST_UPDATE, API_METHOD.PUT, JSON.stringify(mapArtist(data)));
}  

export async function saveExistingArtistDescriptionDetails(data: ArtistDescriptionSchema): Promise<ApiResponse<AddEditActionResponse>> {  
  return await apiCall<AddEditActionResponse>(ARTIST_UPDATE_DESCRIPTION, API_METHOD.PUT, JSON.stringify(mapArtistDescription(data)));
}

export async function getArtist(id: number): Promise<Artist> { 
  return await apiGetCall<Artist>(formatString(GET_ARTIST, id), CACHE_TYPE.NO_CACHE);
} 

export async function getArtistsByLetter(letter: string): Promise<ArtistSearchItem[]> {  
  return await apiGetCall<ArtistSearchItem[]>(formatString(SEARCH_ARTISTS_BY_LETTER, letter), CACHE_TYPE.NO_CACHE);
}

export async function getArtistsByText(text: string): Promise<ArtistSearchItem[]> {  
  return await apiGetCall<ArtistSearchItem[]>(formatString(SEARCH_ARTISTS_BY_TEXT, text), CACHE_TYPE.NO_CACHE);
} 