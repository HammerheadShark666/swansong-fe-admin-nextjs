import { mapArtistMember } from "@/app/lib/mappers/artistMapper";
import { ArtistMemberDetailsSchema } from "../validation/artistMemberDetailsSchema";  
import { ArtistMemberResponse } from "@/app/interfaces/artistMemberResponse"; 
import { ApiResponse } from "@/app/interfaces/apiResponse";  
import { apiCall } from "@/app/lib/apiHelper";
import { API_METHOD } from "@/app/lib/enums";
import { ALBUM_SONG_ADD, ALBUM_SONG_DELETE, ALBUM_SONG_UPDATE } from "@/app/lib/urls";
import { formatString } from "@/app/lib/stringHelper";

export async function saveExistingArtistMember(data: ArtistMemberDetailsSchema): Promise<ApiResponse<ArtistMemberResponse>> {  
  return await apiCall<ArtistMemberResponse>(ALBUM_SONG_UPDATE, API_METHOD.PUT, JSON.stringify(mapArtistMember(data))); 
}

export async function saveNewArtistMember(data: ArtistMemberDetailsSchema): Promise<ApiResponse<ArtistMemberResponse>> {  
  return await apiCall<ArtistMemberResponse>(ALBUM_SONG_ADD, API_METHOD.POST, JSON.stringify(mapArtistMember(data)));
}

export async function deleteArtistMember(id: number): Promise<ApiResponse<ArtistMemberResponse>> {  
  return await apiCall<ArtistMemberResponse>(formatString(ALBUM_SONG_DELETE, id), API_METHOD.DELETE, null);   
}