import { getMember } from "@/app/(secure)/members/actions/member";
import { getMemberLookupsForm } from "@/app/(secure)/members/actions/lookups"; 
import EditMemberTabs from "@/app/(secure)/members/components/tabs/editMemberTabs";
import PageNavigationBar from "@/app/components/navigation/pageNavigationBar"; 
import { ACTION, MODE } from "@/app/lib/enums";
import { Member } from "@/app/types/member/member";
import { MemberDescription } from "@/app/types/member/memberDescription";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swansong - Edit Member",
  description: "Swansong music admin site"
}

export default async function EditMemberPage({ params }:{ params: Promise<{ id: string }> } ) {      
  
  const {id} = await params; 
  const member = await getMember(Number(id)); 
  const memberDescription = getMemberDescription(member);
  const lookups = await getMemberLookupsForm();  

  function getMemberDescription(member: Member){
    const memberDescription: MemberDescription = {
      id: member.id,
      description: member.description
    }
    return memberDescription;
  }
 
  return  (    
    <>
      <PageNavigationBar action={ACTION.EDIT} mode={MODE.MEMBER}></PageNavigationBar>   
      <div className="flex flex-row h-full flex-1 w-full border-gray-100 bg-white pl-4 pr-4 mb-4">      
        <EditMemberTabs member={member} memberDescription={memberDescription} birthPlaceItems={lookups.birthPlaces}></EditMemberTabs> 
      </div>      
    </> 
  )}; 