'use server'

import { Album } from "@/app/types/album/album"; 
import { mapAlbum, mapAlbumDescription } from "@/app/lib/mappers/albumMapper"; 
import { apiCallAuthenticated, apiGetCallAuthenticated } from "@/app/lib/apiHelper"; 
import { AlbumSearchItem } from "@/app/interfaces/albumSearchItem";
import { API_ALBUM_ADD, API_ALBUM_UPDATE, API_ALBUM_UPDATE_DESCRIPTION, API_GET_ALBUM, API_GET_RANDOM_ALBUMS, API_SEARCH_ALBUMS_BY_LETTER, API_SEARCH_ALBUMS_BY_TEXT } from "@/app/lib/urls";
import { formatString } from "@/app/lib/stringHelper"; 
import { ErrorResponse } from "@/app/interfaces/apiResponse";
import { API_METHOD, CACHE_TYPE } from "@/app/lib/enums";
import { AlbumLookup } from "@/app/types/album/albumLookup";
import { AlbumDetailsSchema } from "../validation/albumDetailsSchema";
import { AlbumDescriptionSchema } from "../validation/albumDescriptionSchema"; 
import { AddEditActionResponse } from "@/app/interfaces/addEditActionResponse";

export async function getRandomAlbums(): Promise<AlbumLookup[] | ErrorResponse> { 
  return await apiGetCallAuthenticated<AlbumLookup[]>(API_GET_RANDOM_ALBUMS, CACHE_TYPE.NO_CACHE); 
} 

export async function  saveNewAlbumDetails(data: AlbumDetailsSchema): Promise<AddEditActionResponse | ErrorResponse> {  
  return await apiCallAuthenticated<AddEditActionResponse>(API_ALBUM_ADD, API_METHOD.POST, JSON.stringify(mapAlbum(data)));
} 

export async function saveExistingAlbumDetails(data: AlbumDetailsSchema): Promise<AddEditActionResponse | ErrorResponse> {  
  return await apiCallAuthenticated<AddEditActionResponse>(API_ALBUM_UPDATE, API_METHOD.PUT, JSON.stringify(mapAlbum(data)));
}  

export async function saveExistingAlbumDescriptionDetails(data: AlbumDescriptionSchema): Promise<AddEditActionResponse | ErrorResponse> {  
  return await apiCallAuthenticated<AddEditActionResponse>(API_ALBUM_UPDATE_DESCRIPTION, API_METHOD.PUT, JSON.stringify(mapAlbumDescription(data)));
}

export async function getAlbum(id: number): Promise<Album | ErrorResponse> { 
  return await apiGetCallAuthenticated<Album>(formatString(API_GET_ALBUM, id), CACHE_TYPE.NO_CACHE);
} 

export async function getAlbumsByLetter(letter: string): Promise<AlbumSearchItem[] | ErrorResponse> {  
  return await apiGetCallAuthenticated<AlbumSearchItem[]>(formatString(API_SEARCH_ALBUMS_BY_LETTER, letter), CACHE_TYPE.NO_CACHE);
}

export async function getAlbumsByText(text: string): Promise<AlbumSearchItem[] | ErrorResponse> {  
  return await apiGetCallAuthenticated<AlbumSearchItem[]>(formatString(API_SEARCH_ALBUMS_BY_TEXT, text), CACHE_TYPE.NO_CACHE);
} 