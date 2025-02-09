import { MemberDescriptionSchema } from "@/app/members/validation/memberDescriptionSchema"; 
import { MemberDetailsSchema } from "@/app/members/validation/memberDetailsSchema";
import { Member } from "../../types/member/member";
import { MemberDescription } from "../../types/member/memberDescription"; 

export function mapMember(data: MemberDetailsSchema) {

  const member: Member = {
    id: data.id,
    stageName: data.stageName,  
    firstName: data.firstName,
    middleName: data.middleName,
    surname: data.surname,
    birthPlaceId:  Number(data.birthPlaceId),
    dateOfBirth: data.dateOfBirth,
    dateOfDeath: data.dateOfDeath,
    photo: "",
    description: ""
  }; 

  return member;
} 

export function mapMemberDescription(data: MemberDescriptionSchema) {

  const memberDescription: MemberDescription = {
    id: data.id,
    description: data.description,      
  }; 

  return memberDescription;
}