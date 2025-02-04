import { apiGetCall } from "@/app/lib/apiHelper";
import { CACHE_TYPE } from "@/app/lib/enums"; 
import { API_MEMBER_LOOKUPS, API_MEMBER_LOOKUPS_FORM } from "@/app/lib/urls"; 
import { MemberLookups } from "@/app/types/member/memberLookups";
  
export async function getMemberLookups(): Promise<MemberLookups> {
  return await apiGetCall<MemberLookups>(API_MEMBER_LOOKUPS, CACHE_TYPE.CACHE);
}

export async function getMemberLookupsForm(): Promise<MemberLookups> {
  return await apiGetCall<MemberLookups>(API_MEMBER_LOOKUPS_FORM, CACHE_TYPE.CACHE);
}