import { apiGetCall } from "@/app/lib/apiHelper";
import { CACHE_TYPE } from "@/app/lib/enums"; 
import { MEMBER_LOOKUPS, MEMBER_LOOKUPS_FORM } from "@/app/lib/urls"; 
import { MemberLookups } from "@/app/types/member/memberLookups";
  
export async function getMemberLookups(): Promise<MemberLookups> {
  return await apiGetCall<MemberLookups>(MEMBER_LOOKUPS, CACHE_TYPE.CACHE);
}

export async function getMemberLookupsForm(): Promise<MemberLookups> {
  return await apiGetCall<MemberLookups>(MEMBER_LOOKUPS_FORM, CACHE_TYPE.CACHE);
}