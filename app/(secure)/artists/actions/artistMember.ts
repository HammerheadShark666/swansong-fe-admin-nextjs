'use server'

import { ArtistMemberUpdateResponse } from "@/app/interfaces/artistMemberResponse"; 
import { ErrorResponse } from "@/app/interfaces/errorResponse";  
import { apiCallAuthenticated } from "@/app/lib/apiHelper";
import { API_METHOD } from "@/app/lib/enums";
import {API_ARTIST_MEMBERS_UPDATE } from "@/app/lib/urls";
import { UpdateArtistMembersRequest } from "@/app/interfaces/updateArtistMembersRequest";

export async function updateArtistMembers(updateArtistMembersRequest: UpdateArtistMembersRequest): Promise<ArtistMemberUpdateResponse | ErrorResponse> {  
  return await apiCallAuthenticated<ArtistMemberUpdateResponse>(API_ARTIST_MEMBERS_UPDATE, API_METHOD.POST, JSON.stringify(updateArtistMembersRequest));   
}