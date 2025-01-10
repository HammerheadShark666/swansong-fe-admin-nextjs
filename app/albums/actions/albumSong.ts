import { mapAlbumSong } from "@/app/lib/mappers";
import { AlbumSongSchema } from "../validation/albumSongSchema";  
import { AlbumSongResponse } from "@/app/interfaces/albumSongResponse"; 
import { ApiResponse } from "@/app/interfaces/apiResponse";  
import { apiCall } from "@/app/lib/apiHelper";
import { API_METHOD } from "@/app/lib/enums";
import { ALBUM_SONG_ADD, ALBUM_SONG_DELETE, ALBUM_SONG_UPDATE } from "@/app/lib/urls";
import { formatString } from "@/app/lib/stringHelper";

export async function saveExistingAlbumSong(data: AlbumSongSchema): Promise<ApiResponse<AlbumSongResponse>> {  
  return await apiCall<AlbumSongResponse>(ALBUM_SONG_UPDATE, API_METHOD.PUT, JSON.stringify(mapAlbumSong(data))); 
}

export async function saveNewAlbumSong(data: AlbumSongSchema): Promise<ApiResponse<AlbumSongResponse>> {  
  return await apiCall<AlbumSongResponse>(ALBUM_SONG_ADD, API_METHOD.POST, JSON.stringify(mapAlbumSong(data)));
}

export async function deleteAlbumSong(id: number): Promise<ApiResponse<AlbumSongResponse>> {  
  return await apiCall<AlbumSongResponse>(formatString(ALBUM_SONG_DELETE, id), API_METHOD.DELETE, null);   
}