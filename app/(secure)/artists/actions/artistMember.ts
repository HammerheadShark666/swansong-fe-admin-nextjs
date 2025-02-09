'use server'

import { mapArtistMember } from "@/app/lib/mappers/artistMapper";
import { ArtistMemberDetailsSchema } from "../validation/artistMemberDetailsSchema";  
import { ArtistMemberResponse, MemberArtistUpdateResponse } from "@/app/interfaces/artistMemberResponse"; 
import { ErrorResponse } from "@/app/interfaces/apiResponse";  
import { apiCallAuthenticated } from "@/app/lib/apiHelper";
import { API_METHOD } from "@/app/lib/enums";
import { API_ALBUM_SONG_ADD, API_ALBUM_SONG_DELETE, API_ALBUM_SONG_UPDATE, API_MEMBERS_UPDATE_ARTISTS } from "@/app/lib/urls";
import { formatString } from "@/app/lib/stringHelper";
import { UpdateArtistMembersRequest } from "@/app/interfaces/updateArtistMembersRequest";

export async function saveExistingArtistMember(data: ArtistMemberDetailsSchema): Promise<ArtistMemberResponse | ErrorResponse> {  
  return await apiCallAuthenticated<ArtistMemberResponse>(API_ALBUM_SONG_UPDATE, API_METHOD.PUT, JSON.stringify(mapArtistMember(data))); 
}

export async function saveNewArtistMember(data: ArtistMemberDetailsSchema): Promise<ArtistMemberResponse | ErrorResponse> {  
  return await apiCallAuthenticated<ArtistMemberResponse>(API_ALBUM_SONG_ADD, API_METHOD.POST, JSON.stringify(mapArtistMember(data)));
}

export async function deleteArtistMember(id: number): Promise<ArtistMemberResponse | ErrorResponse> {  
  return await apiCallAuthenticated<ArtistMemberResponse>(formatString(API_ALBUM_SONG_DELETE, id), API_METHOD.DELETE, null);   
}

export async function updateMemberArtistId(updateArtistMembersRequest: UpdateArtistMembersRequest): Promise<MemberArtistUpdateResponse | ErrorResponse> {  
  return await apiCallAuthenticated<MemberArtistUpdateResponse>(API_MEMBERS_UPDATE_ARTISTS, API_METHOD.PUT, JSON.stringify(updateArtistMembersRequest));   
}