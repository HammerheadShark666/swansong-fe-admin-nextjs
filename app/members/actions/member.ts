import { MemberSearchItem } from "@/app/interfaces/memberSearchItem";
import { apiGetCall } from "@/app/lib/apiHelper";
import { CACHE_TYPE } from "@/app/lib/enums";
import { formatString } from "@/app/lib/stringHelper";
import { SEARCH_MEMBERS_BY_LETTER, SEARCH_MEMBERS_BY_TEXT } from "@/app/lib/urls";

export async function getMembersByLetter(letter: string): Promise<MemberSearchItem[]> {  
  return await apiGetCall<MemberSearchItem[]>(formatString(SEARCH_MEMBERS_BY_LETTER, letter), CACHE_TYPE.NO_CACHE);
}

export async function getMembersByText(text: string): Promise<MemberSearchItem[]> {  
  return await apiGetCall<MemberSearchItem[]>(formatString(SEARCH_MEMBERS_BY_TEXT, text), CACHE_TYPE.NO_CACHE);
} 