'use server'

import { MemberSearchItem } from "@/app/interfaces/memberSearchItem";
import { apiCallAuthenticated, apiGetCallAuthenticated } from "@/app/lib/apiHelper";
import { API_METHOD, CACHE_TYPE } from "@/app/lib/enums";
import { formatString } from "@/app/lib/stringHelper";
import { API_DELETE_MEMBER, API_GET_MEMBER, API_MEMBER_ADD, API_MEMBER_UPDATE, API_MEMBER_UPDATE_DESCRIPTION, API_SEARCH_MEMBERS_BY_LETTER, API_SEARCH_MEMBERS_BY_TEXT } from "@/app/lib/urls";
import { MemberDescriptionSchema } from "../validation/memberDescriptionSchema";
import { AddEditActionResponse } from "@/app/interfaces/addEditActionResponse";
import { ErrorResponse } from "@/app/interfaces/errorResponse";
import { mapMember, mapMemberDescription } from "@/app/lib/mappers/memberMapper";
import { MemberDetailsSchema } from "../validation/memberDetailsSchema";
import { Member } from "@/app/types/member/member";

export async function getMembersByLetter(letter: string): Promise<MemberSearchItem[] | ErrorResponse> {  
  return await apiGetCallAuthenticated<MemberSearchItem[]>(formatString(API_SEARCH_MEMBERS_BY_LETTER, letter), CACHE_TYPE.NO_CACHE);
}

export async function getMembersByText(text: string): Promise<MemberSearchItem[] | ErrorResponse> {  
  return await apiGetCallAuthenticated<MemberSearchItem[]>(formatString(API_SEARCH_MEMBERS_BY_TEXT, text), CACHE_TYPE.NO_CACHE);
} 

export async function saveExistingMemberDescriptionDetails(data: MemberDescriptionSchema): Promise<AddEditActionResponse | ErrorResponse> {  
  return await apiCallAuthenticated<AddEditActionResponse>(API_MEMBER_UPDATE_DESCRIPTION, API_METHOD.PUT, JSON.stringify(mapMemberDescription(data)));
}

export async function  saveNewMemberDetails(data: MemberDetailsSchema): Promise<AddEditActionResponse | ErrorResponse> {  
  return await apiCallAuthenticated<AddEditActionResponse>(API_MEMBER_ADD, API_METHOD.POST, JSON.stringify(mapMember(data)));
} 

export async function saveExistingMemberDetails(data: MemberDetailsSchema): Promise<AddEditActionResponse | ErrorResponse> {  
  return await apiCallAuthenticated<AddEditActionResponse>(API_MEMBER_UPDATE, API_METHOD.PUT, JSON.stringify(mapMember(data)));
}  

export async function getMember(id: number): Promise<Member | ErrorResponse> { 
  return await apiGetCallAuthenticated<Member>(formatString(API_GET_MEMBER, id), CACHE_TYPE.NO_CACHE);
} 

export async function deleteMember(id: number): Promise<AddEditActionResponse | ErrorResponse> {  
  return await apiCallAuthenticated<AddEditActionResponse>(formatString(API_DELETE_MEMBER, id), API_METHOD.DELETE, "");
}