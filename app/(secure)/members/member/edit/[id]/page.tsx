import { getMember } from "@/app/(secure)/members/actions/member";
import { getMemberLookupsForm } from "@/app/(secure)/members/actions/lookups"; 
import EditMemberTabs from "@/app/(secure)/members/components/tabs/editMemberTabs";
import PageNavigationBar from "@/app/components/navigation/pageNavigationBar"; 
import { ACTION, MODE } from "@/app/lib/enums";
import { isMember, Member } from "@/app/types/member/member";
import { MemberDescription } from "@/app/types/member/memberDescription";
import { Metadata } from "next";
import { isMemberLookups, MemberLookups } from "@/app/types/member/memberLookups";
import Messages from "@/app/components/controls/messages";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Swansong - Edit Member",
  description: "Swansong music admin site"
}

export default async function EditMemberPage({ params }:{ params: Promise<{ id: string }> } ) {      
  
  let member: Member;
  let memberDescription: MemberDescription;
  let lookups: MemberLookups;
  const {id} = await params;   
    
  function getMemberDescription(member: Member){
    const memberDescription: MemberDescription = {
      id: member.id,
      description: member.description
    }
    return memberDescription;
  }
  
  const memberResponse = await getMember(Number(id)); 
  if(isMember(memberResponse)) 
  {
    member = memberResponse;
    memberDescription = getMemberDescription(member);
    
    const memberLookupsResponse = await getMemberLookupsForm();
    if(isMemberLookups(memberLookupsResponse)) 
    {    
      lookups = memberLookupsResponse; 
  
      return  (    
        <>
          <PageNavigationBar action={ACTION.EDIT} mode={MODE.MEMBER} id={Number(id)}></PageNavigationBar>   
          <div className="flex flex-col w-full border-gray-100 bg-white h-full flex-1 pl-4 pr-4">
            <EditMemberTabs member={member} memberDescription={memberDescription} artists={member.artists} birthPlaceItems={lookups.birthPlaces} ></EditMemberTabs>
          </div>      
        </> 
      )
    } 
    else   
      return (   
        <Messages messages={memberLookupsResponse.messages}></Messages>
      )
  } 
  else 
  {    
    if(memberResponse.status == 404)
    {
      const notFoundMessage = "Member not found (" + id + ")";
      return redirect(`/secure/not-found?message=` + notFoundMessage);
    } 
    else      
      return ( 
        <Messages messages={memberResponse.messages}></Messages> 
      );
  } 
}; 