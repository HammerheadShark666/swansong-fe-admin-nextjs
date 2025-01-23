"use client";  
     
import { HiOutlineBookOpen, HiOutlineIdentification, HiOutlineCamera } from "react-icons/hi"; 
import { Tabs } from "flowbite-react";  
import MemberDetailsForm from "@/app/members/components/memberDetailsForm";
import { Member } from "@/app/types/member/member";
import { SelectItem } from "@/app/types/selectItem";
import MemberPhotoForm from "@/app/members/components/memberPhotoForm"; 
import MemberDescriptionForm from "@/app/members/components/memberDescriptionForm";
import { MemberDescription } from "@/app/types/member/memberDescription";
import Spinner from "@/app/components/spinner";
import { useState } from "react";
import { ACTION } from "@/app/lib/enums"; 

interface IProps {
  member: Member;
  memberDescription: MemberDescription;
  birthPlaceItems: SelectItem[];
}

export default function  EditMemberTabs({member, memberDescription, birthPlaceItems}: IProps) {   

  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const customTheme = 
  { 
    "tablist": {    
      "tabitem": {
        "base": "flex items-center justify-center p-4 text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400",
        "variant": {       
          "underline": {
            "base": "text-black bg-white",
            "active": {
              "on": "active text-slate-400 underline underline-offset-2",
              "off": "border-transparent text-black hover:text-slate-400"
            }
          },
        }
      }
    }   
  }  

  return (  
  
    <> 
      <div className="flex flex-col w-full"> 
        <Spinner showSpinner={showSpinner}></Spinner>
          <Tabs className="" aria-label="Tabs with underline" variant="underline" theme={customTheme}>
            <Tabs.Item active title="Details" icon={HiOutlineIdentification}>
              <div className="font-medium text-black w-full relative">
                <MemberDetailsForm setShowSpinner={setShowSpinner} action={ACTION.EDIT} memberData={member} birthPlaceItems={birthPlaceItems} /> 
              </div>
            </Tabs.Item>
            <Tabs.Item title="Photo" icon={HiOutlineCamera}>
              <div className="font-medium text-black">
                <MemberPhotoForm setShowSpinner={setShowSpinner} id={member.id} filename={member.photo}></MemberPhotoForm> 
              </div>
            </Tabs.Item>         
            <Tabs.Item title="Description" icon={HiOutlineBookOpen}>
              <div className="font-medium text-black flex flex-col">  
                <MemberDescriptionForm setShowSpinner={setShowSpinner} memberDescription={memberDescription}></MemberDescriptionForm>              
              </div>
            </Tabs.Item>             
          </Tabs>
      </div>
    </>
  )
};