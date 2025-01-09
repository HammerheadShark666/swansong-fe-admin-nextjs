import { Album } from "@/app/types/album";
import { AlbumDetailsSchema } from "@/app/albums/validation/albumDetailsSchema"; 
import { mapAlbum, mapAlbumDescription } from "@/app/lib/mappers";
import { AlbumDescriptionSchema } from "@/app/albums/validation/albumDescriptionSchema";
import { apiCall, apiGetCall } from "@/app/lib/apiHelper"; 
import { AlbumSearchItem } from "@/app/interfaces/albumSearchItem";
import { ALBUM_ADD, ALBUM_UPDATE, ALBUM_UPDATE_DESCRIPTION, GET_ALBUM, SEARCH_ALBUMS_BY_LETTER, SEARCH_ALBUMS_BY_TEXT } from "@/app/lib/urls";
import { formatString } from "@/app/lib/stringHelper";
import { AlbumResponse } from "@/app/interfaces/albumResponse";
import { ApiResponse } from "@/app/interfaces/apiResponse";
import { API_METHOD } from "@/app/lib/enums";

export async function  saveNewAlbumDetails(data: AlbumDetailsSchema): Promise<ApiResponse<AlbumResponse>> {  
  return await apiCall<AlbumResponse>(ALBUM_ADD, API_METHOD.POST, JSON.stringify(mapAlbum(data)));
} 

export async function saveExistingAlbumDetails(data: AlbumDetailsSchema): Promise<ApiResponse<AlbumResponse>> {  
  return await apiCall<AlbumResponse>(ALBUM_UPDATE, API_METHOD.PUT, JSON.stringify(mapAlbum(data)));
}  

export async function saveExistingAlbumDescriptionDetails(data: AlbumDescriptionSchema): Promise<ApiResponse<AlbumResponse>> {  
  return await apiCall<AlbumResponse>(ALBUM_UPDATE_DESCRIPTION, API_METHOD.PUT, JSON.stringify(mapAlbumDescription(data)));
}

export async function getAlbum(id: number): Promise<Album> { 
  return await apiGetCall<Album>(formatString(GET_ALBUM, id));
} 

export async function getAlbumsByLetter(letter: string): Promise<AlbumSearchItem[]> {  
  return await apiGetCall<AlbumSearchItem[]>(formatString(SEARCH_ALBUMS_BY_LETTER, letter));
}

export async function getAlbumsByText(text: string): Promise<AlbumSearchItem[]> {  
  return await apiGetCall<AlbumSearchItem[]>(formatString(SEARCH_ALBUMS_BY_TEXT, text));
} 