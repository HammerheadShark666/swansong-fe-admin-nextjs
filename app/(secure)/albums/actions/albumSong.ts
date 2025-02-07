'use server'

import { mapAlbumSong } from "@/app/lib/mappers/albumMapper";
import { AlbumSongSchema } from "../validation/albumSongSchema";  
import { AlbumSongResponse } from "@/app/interfaces/albumSongResponse"; 
import { ApiResponse } from "@/app/interfaces/apiResponse";  
import { apiCallAuthenticated } from "@/app/lib/apiHelper";
import { API_METHOD } from "@/app/lib/enums";
import { API_ALBUM_SONG_ADD, API_ALBUM_SONG_DELETE, API_ALBUM_SONG_UPDATE } from "@/app/lib/urls";
import { formatString } from "@/app/lib/stringHelper";

export async function saveExistingAlbumSong(data: AlbumSongSchema): Promise<ApiResponse<AlbumSongResponse>> {  
  return await apiCallAuthenticated<AlbumSongResponse>(API_ALBUM_SONG_UPDATE, API_METHOD.PUT, JSON.stringify(mapAlbumSong(data))); 
}

export async function saveNewAlbumSong(data: AlbumSongSchema): Promise<ApiResponse<AlbumSongResponse>> {  
  return await apiCallAuthenticated<AlbumSongResponse>(API_ALBUM_SONG_ADD, API_METHOD.POST, JSON.stringify(mapAlbumSong(data)));
}

export async function deleteAlbumSong(id: number): Promise<ApiResponse<AlbumSongResponse>> {  
  return await apiCallAuthenticated<AlbumSongResponse>(formatString(API_ALBUM_SONG_DELETE, id), API_METHOD.DELETE, null);   
}