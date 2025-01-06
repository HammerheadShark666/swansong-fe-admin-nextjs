import { mapAlbumSong } from "@/app/lib/mappers";
import { AlbumSongSchema } from "../validation/albumSongSchema";  
import { AlbumSongResponse } from "@/app/interfaces/albumSongResponse"; 
import { ApiResponse } from "@/app/interfaces/apiResponse";  
import { apiCall } from "@/app/lib/apiHelper";

export async function saveExistingAlbumSong(data: AlbumSongSchema): Promise<ApiResponse<AlbumSongResponse>> {  
  return await apiCall<AlbumSongResponse>("album/songs/song/update", "PUT", JSON.stringify(mapAlbumSong(data))); 
}

export async function saveNewAlbumSong(data: AlbumSongSchema): Promise<ApiResponse<AlbumSongResponse>> {  
  return await apiCall<AlbumSongResponse>("album/songs/song/add", "POST", JSON.stringify(mapAlbumSong(data)));
}

export async function deleteAlbumSong(id: number): Promise<ApiResponse<AlbumSongResponse>> {  
  return await apiCall<AlbumSongResponse>("album/songs/song/" + id, "DELETE", null);   
}