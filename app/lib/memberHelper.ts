import { MemberSearchItem } from "../interfaces/memberSearchItem";
import { getDefaultMemberImageUrl } from "./imageHelper";

export function getMemberPhoto(member: MemberSearchItem)
{
  return member.photo == null 
    ? getDefaultMemberImageUrl() 
    : process.env.NEXT_PUBLIC_AZURE_STORAGE_URL + "members/" + member.photo;
}